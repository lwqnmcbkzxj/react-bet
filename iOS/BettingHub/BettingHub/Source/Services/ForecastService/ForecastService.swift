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
    
    private lazy var localMarks = MarksAdapter<Forecast>()
    
    func forecastsRequest(page: Int, quantity: Int,
                         timeFrame: TimeFrame, sport: Sport) -> (RequestContent, URLRequest) {
        let url = "api/forecasts"
        
        var content = reqBuilder.pagedRequest(url: url, page: page, limit: quantity)
        content = reqBuilder.addParams(to: content,
                                       params: [
                                        "time": String(timeFrame.getLengthInHours()),
                                        "sport_id": String(sport.id) ])
        
        let req = reqBuilder.getRequest(content: content)
        
        //if authorized => rating and bookmark data sent from api
        let auth = reqBuilder.authorize(req) ?? req
        
        return (content, auth)
    }
    
    func userForecastsRequest(id: Int, page: Int, count: Int) -> (RequestContent, URLRequest) {
        let url = "api/users/\(id)/forecasts"
        let paged = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        let req = reqBuilder.getRequest(content: paged)
        return (paged, req)
    }
    
    func favoritesRequest(page: Int, count: Int) -> (RequestContent, URLRequest)? {
        let url = "api/forecasts/" //TODO: change when ready
        let pagedContent = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        let req = reqBuilder.getRequest(content: pagedContent)
        let authorized = reqBuilder.authorize(req)
        
        if authorized == nil { return nil }
        
        return (pagedContent, authorized!)
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
        let req = reqBuilder.getRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
    
    func subscriptionsForecastsRequest(page: Int, quantity: Int, timeFrame: TimeFrame, sport: Sport) -> (RequestContent, URLRequest) {
        let selfId = userService.currentUserInfo?.forecaster.id ?? 0
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
        fatalError("Not implemented in ForecastService")
    }
    
    func getFavorites(count: Int, page: Int, callback: (ServiceCallback<[Forecast]>)?) {
        guard let req = favoritesRequest(page: page, count: count)?.1 else {
            callback?(.failure(.userUnauthorized))
            return
        }
        
        requestList(req: req, callback: callback)
    }
    
    func userForecasts(id: Int, page: Int, count: Int,
                   callback: (ServiceCallback<[Forecast]>)?) {
        let req = userForecastsRequest(id: id, page: page, count: count).1
        requestList(req: req, callback: callback)
    }
    
    func mark(_ bookmarked: Bool, forecast: Forecast) {
        if authService.authError != nil { return }
        
        let current = localBookmarked(forecast: forecast)
        
        if current == bookmarked {
            print("Unexpected bookmark behavior. Ignoring")
            return
        }
        
        localMarks.saveBookmark(id: forecast.id, bookmarked: bookmarked)
        
        let req = markRequest(id: forecast.id).1
        client.request(request: req) { (result) in
            result
                .onFailure { print($0.asBHError().localizedDescription )}
        }
    }
    
    func bookmarks(page: Int, limit: Int, callback: (ServiceCallback<[Forecast]>)?) {
        if authService.authError != nil { return }
        let req = bookmarksRequest(page: page, limit: limit).1
        
        requestList(req: req, callback: callback)
    }
    
    func rating(status: RatingStatus, forecast: Forecast) {
        if authService.authError != nil { return }
        
        let current = localRatingStatus(forecast: forecast)
        
        func generateApiEndpoint() -> Bool? {
            if current == status { return nil }
            
            if status == .like {
                return true
            } else if status == .dislike {
                return false
            } else if status == .none {
                if current == .like {
                    return true
                } else if current == .dislike {
                    return false
                }
            }
            
            return nil
        }
        
        guard let up = generateApiEndpoint() else {
            print("Unexpected rating behavior. Ignoring")
            return
        }
        
        localMarks.saveRating(id: forecast.id, status: status)
        
        let req = ratingRequest(up, id: forecast.id).1
        client.request(request: req) { (res) in
            res.onFailure { print($0.asBHError().localizedDescription) }
        }
    }
    
    func localRatingStatus(forecast: Forecast) -> RatingStatus? {
        let local = localMarks.getRating(id: forecast.id)
        return local
    }
    
    func localBookmarked(forecast: Forecast) -> Bool? {
        let local = localMarks.getBookmark(id: forecast.id)
        return local
    }
}

private extension ForecastService {
    
    func requestList(req: URLRequest, callback: (ServiceCallback<[Forecast]>)?) {
        client.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .map { $0.decodePaged(pageElement: Forecast.self) }
                .mapError { $0.asBHError()}
                .onSuccess { $0.invokeCallback(callback)}
                .onFailure { callback(.failure($0))}
        }
    }
}
