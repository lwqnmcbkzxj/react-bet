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
        
        var params: [String: String] = [
                "page": String(page),
                "limit": String(quantity)
        ]
        
        if timeFrame != .all { params["time"] = String(timeFrame.getLengthInHours()) }
        if sport.id != Sport.all.id { params["sport_id"] = String(sport.id) }
    
        let content = (url, params)
        let req = reqBuilder.getRequest(content: content)
        
        return (content, req)
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
}

private extension ForecastService {
    func requestList(req: URLRequest, callback: ((Result<[Forecast], BHError>) -> Void)?) {
        client.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let forecasts = try? JSONDecoder().decode([Forecast].self, from: data) else {
                    callback?(.failure(.unexpectedContent))
                    return
                }

                callback?(.success(forecasts))

            case .failure(let error):
                callback?(.failure(error.asBHError()))
            }
        }
    }
}
