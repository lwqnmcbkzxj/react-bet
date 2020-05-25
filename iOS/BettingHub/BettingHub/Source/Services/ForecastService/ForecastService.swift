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
        let url = "api/forecasts"
        let paged = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        let content = reqBuilder.addParams(to: paged,
                                           params: ["id": String(id)])
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    func favoritesRequest(page: Int, count: Int) -> (RequestContent, URLRequest)? {
        let url = "api/forecasts/" //TODO: change when ready
        let pagedContent = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        let req = reqBuilder.getRequest(content: pagedContent)
        let authorized = reqBuilder.authorize(req)
        
        if authorized == nil { return nil }
        
        return (pagedContent, authorized!)
    }
}

extension ForecastService: IForecastService {
    
    func getForecasts(count: Int, page: Int,
                          sport: Sport, timeFrame: TimeFrame,
                          subscribers: Bool,
                          callback: ((Result<[Forecast], BHError>) -> Void)?) {

            let req = forecstsRequest(page: page,
                                      quantity: count,
                                      timeFrame: timeFrame,
                                      sport: sport).1
            

            requestList(req: req, callback: callback)
        }
    
    func getForecast(id: Int, callback: ((Result<Forecast, BHError>) -> Void)?) {
        fatalError("Not implemented in ForecastService")
    }
    
    func getFavorites(count: Int, page: Int, callback: ((Result<[Forecast], BHError>) -> Void)?) {
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
}

private extension ForecastService {
    func requestList(req: URLRequest, callback: ((Result<[Forecast], BHError>) -> Void)?) {
        client.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let forecasts = self.getForecasts(from: data) else {
                    callback?(.failure(.unexpectedContent))
                    return
                }

                callback?(.success(forecasts))

            case .failure(let error):
                callback?(.failure(error.asBHError()))
            }
        }
    }
    
    //TODO: change on backend
    func getForecasts(from data: Data) -> [Forecast]? {
        
        struct ForecastsResponse: Codable {
            let data: [Forecast]
        }
        
        let res = try? JSONDecoder().decode(ForecastsResponse.self, from: data)
        return res?.data
    }
}
