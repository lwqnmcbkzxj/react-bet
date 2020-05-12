//
//  ForecastsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecastService: IForecastService {
    
    private let authService: IAuthService
    private let client: IHttpClient
    private let reqBuilder: IRequestBuilder
    
    init(authService: IAuthService,
         client: IHttpClient,
         requestBuilder: IRequestBuilder) {
        self.authService = authService
        self.client = client
        self.reqBuilder = requestBuilder
    }
    
    func getForecasts(count: Int, page: Int,
                      sport: Sport, timeFrame: TimeFrame,
                      subscribers: Bool,
                      callback: ((Result<[Forecast], BHError>) -> Void)?) {
        
        let forecasts = (0..<count).map { _ in Forecast.stub() }
        callback?(.success(forecasts))
//        if subscribers,
//            let authError = authService.isAuthorized {
//
//            callback?(.failure(authError))
//            return
//        }
//
//        let req = reqBuilder.forecastsList(page: page, quantity: count,
//                                           timeFrame: timeFrame, sport: sport,
//                                           subscribers: subscribers, favorites: false)
//
//        requestList(req: req, callback: callback)
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
