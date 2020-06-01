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
    
    
    func forecstsRequest(page: Int, quantity: Int,
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
}

extension ForecastService: IForecastService {
    
    func getForecasts(count: Int, page: Int,
                          sport: Sport, timeFrame: TimeFrame,
                          subscribers: Bool,
                          callback: (ServiceCallback<[Forecast]>)?) {

            let req = forecstsRequest(page: page,
                                      quantity: count,
                                      timeFrame: timeFrame,
                                      sport: sport).1
            

            requestList(req: req, callback: callback)
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
    
    func mark(forecastId: Int) {
        if authService.isAuthorized != nil { return }
        let req = markRequest(id: forecastId).1
        client.request(request: req) { (result) in
            result.onFailure { print($0.asBHError().localizedDescription )}
        }
    }
    
    func bookmarks(page: Int, limit: Int, callback: (ServiceCallback<[Forecast]>)?) {
        if authService.isAuthorized != nil { return }
        let req = bookmarksRequest(page: page, limit: limit).1
        
        //can't request list because different response structure
        client.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .map { $0.decodeJSON([Forecast].self)}
                .mapError { $0.asBHError() }
                .onSuccess { $0.invokeCallback(callback) }
                .onFailure { callback(.failure($0)) }
            
        }
    }
}

private extension ForecastService {
    
    func requestList(req: URLRequest, callback: (ServiceCallback<[Forecast]>)?) {
        client.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .map { $0.decodePaged(pageElement: Forecast.self)}
                .mapError { $0.asBHError()}
                .onSuccess { $0.invokeCallback(callback)}
                .onFailure { callback(.failure($0))}
        }
    }
}
