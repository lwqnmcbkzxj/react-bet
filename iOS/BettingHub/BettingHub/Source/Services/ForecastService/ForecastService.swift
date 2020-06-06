//
//  ForecastsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecastService {
    
    @LazyInjected private var authService: IAuthService
    @LazyInjected private var client: IHttpClient
    @LazyInjected private var reqBuilder: IRequestBuilder
    @LazyInjected private var userService: IUserService
    @LazyInjected private var forecasterService: IForecasterService
    
//    private lazy var localMarks = MarksAdapter<Forecast>()
    
    var forecasts: [Int: Forecast] = [:]
    
    func forecastRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/forecasts"
        let content = reqBuilder.idRequest(url: url, id: id)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    func forecastsRequest(page: Int, quantity: Int,
                         timeFrame: TimeFrame, sport: Sport) -> (RequestContent, URLRequest) {
        let url = "api/forecasts"
        
        var content = reqBuilder.pagedRequest(url: url, page: page, limit: quantity)
        content = reqBuilder.addParams(to: content,
                                       params: [
                                        "time": String(timeFrame.getLengthInHours()),
                                        "sport_id": String(sport.id) ])
        
        let req = reqBuilder.getRequest(content: content)
        
        return (content, req)
    }
    
    func userForecastsRequest(id: Int, page: Int, count: Int) -> (RequestContent, URLRequest) {
        let url = "api/users/\(id)/forecasts"
        let paged = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        let req = reqBuilder.getRequest(content: paged)
        return (paged, req)
    }
    
    func markRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/forecasts/\(id)/mark"
        let content = (url, [String: String]())
        let req = reqBuilder.jsonPostRequest(content: content)
        let authorized = reqBuilder.authorize(req) ?? req
        return (content, authorized)
    }
    
    func bookmarksRequest(page: Int, limit: Int) -> (RequestContent, URLRequest) {
        let url = "api/forecasts/marked"
        let content = reqBuilder.pagedRequest(url: url, page: page, limit: limit)
        let req = reqBuilder.getRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
    
    func ratingRequest(_ like: Bool, id: Int) -> (RequestContent, URLRequest) {
        let url = "api/forecasts/\(id)/\(like ? "like" : "dislike")"
        let content = RequestContent(url, [:])
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
    
    func subscriptionsForecastsRequest(page: Int, quantity: Int, timeFrame: TimeFrame, sport: Sport) -> (RequestContent, URLRequest) {
        let selfId = userService.currentUserInfo.forecaster.data?.id ?? 0
        let url = "api/users/\(selfId)/subscription/forecasts"
        var content = reqBuilder.pagedRequest(url: url, page: page, limit: quantity)
        content = reqBuilder.addParams(to: content,
                                       params: [
                                        "time": String(timeFrame.getLengthInHours()),
                                        "sport_id": String(sport.id)])
        let req = reqBuilder.getRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
}

extension ForecastService: IForecastService {
    
    func handledForecast(id: Int) -> Forecast? {
        return forecasts[id]
    }
    
    func createOrUpdate(obj: ForecastApiObject) -> Forecast {
        if let current = handledForecast(id: obj.id) {
            self.applyUpdates(from: obj, to: current)
            return current
        } else {
            let new = self.forecast(from: obj)
            self.forecasts[obj.id] = new
            return new
        }
    }
    
    func getForecasts(count: Int, page: Int,
                          sport: Sport, timeFrame: TimeFrame,
                          subscribers: Bool,
                          callback: (ServiceCallback<[Forecast]>)?) {
        if subscribers {
            let req = subscriptionsForecastsRequest(page: page, quantity: count,
                                                    timeFrame: timeFrame, sport: sport).1
            requestList(req: req, callback: callback)
        } else {
            let req = forecastsRequest(page: page, quantity: count,
                                       timeFrame: timeFrame, sport: sport).1
            requestList(req: req, callback: callback)
        }
    }
    
    func getForecast(id: Int, callback: ((Result<Forecast, BHError>) -> Void)?) {
        let req = forecastRequest(id: id).1
        requestSingle(req: req, callback: callback)
    }
    
    func userForecasts(id: Int, page: Int, count: Int,
                   callback: (ServiceCallback<[Forecast]>)?) {
        let req = userForecastsRequest(id: id, page: page, count: count).1
        requestList(req: req, callback: callback)
    }
    
    func bookmarks(page: Int, limit: Int, callback: (ServiceCallback<[Forecast]>)?) {
        if authService.authError != nil { return }
        let req = bookmarksRequest(page: page, limit: limit).1
        
        requestList(req: req, callback: callback)
    }
    
    func mark(_ bookmarked: Bool, forecast: Forecast) {
        if authService.authError != nil { return }
        
        if bookmarked == forecast.bookmarked.data {
            print("Unexpected bookmark behavior. Ignoring")
            return
        }
        
        //apply instatant changes
        forecast.bookmarked.data = bookmarked
        forecast.bookmarks.data += bookmarked ? 1 : -1
        
        let req = markRequest(id: forecast.id).1
        client.request(request: req) { (result) in
            result.onSuccess { (_) in
                //revalidate data from server
                self.getForecast(id: forecast.id, callback: nil)
            }.onFailure { (err) in
                print(err)
            }
        }
    }
    
    func rating(status: RatingStatus, forecast: Forecast) {
        if authService.authError != nil { return }
        
        let current = forecast.ratingStatus.data
        
        guard status != current
        else {
            print("Unexpected rating behavior. Ignoring")
            return
        }
        
        let change = current.changeInPoints(for: status)
        forecast.rating.data += change
        forecast.ratingStatus.data = status
        
        let up = current.endpointBool(for: status)
        
        let req = ratingRequest(up, id: forecast.id).1
        client.request(request: req) { (res) in
            res.onSuccess { (_) in
                self.getForecast(id: forecast.id, callback: nil)
            }.onFailure { (err) in
                print(err)
            }
        }
    }
}

extension ForecastService {
    
    func forecast(from obj: ForecastApiObject) -> Forecast {
        let forecaster = forecasterService.createOrUpdate(obj: obj.user)
        return Forecast(id: obj.id,
                        user: forecaster,
                        event: obj.event,
                        text: obj.text,
                        creationDate: obj.creationDate,
                        bet: obj.bet,
                        comments: obj.comments,
                        bookmarks: obj.bookmarks,
                        bookmarked: obj.bookmarked,
                        ratingStatus: obj.ratingStatus,
                        rating: obj.rating)
    }
    
    func applyUpdates(from obj: ForecastApiObject, to forecast: Forecast) {
        
        forecasterService.createOrUpdate(obj: obj.user)
        
        forecast.event.data = obj.event
        forecast.text.data = obj.text
        forecast.creationDate.data = obj.creationDate
        forecast.bet.data = obj.bet
        forecast.comments.data = obj.comments
        forecast.bookmarks.data = obj.bookmarks
        forecast.bookmarked.data = obj.bookmarked
        forecast.ratingStatus.data = obj.ratingStatus
        forecast.rating.data = obj.rating
    }
}

private extension ForecastService {
    
    func requestList(req: URLRequest, callback: (ServiceCallback<[Forecast]>)?) {
        client.request(request: req) { (result) in
            let mapped = result
                .map { $0.decodePagedOrNil(pageElement: ForecastApiObject.self)}
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let forecastObjs):
                let arr = forecastObjs?.map { self.createOrUpdate(obj: $0) }
                callback?(.success(arr ?? []))
                
            case .failure(let err):
                callback?(.failure(err))
            }
        }
    }
    
    func requestSingle(req: URLRequest, callback: (ServiceCallback<Forecast>)?) {
        client.request(request: req) { (result) in
            let mapped = result
                .map { $0.decodeJSONOrNil(ForecastApiObject.self)}
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let obj):
                guard let obj = obj else {
                    callback?(.failure(.unexpectedContent))
                    return
                }
                
                let forecast = self.createOrUpdate(obj: obj)
                callback?(.success(forecast))
                
            case .failure(let err):
                callback?(.failure(err))
            }
        }
    }
}
