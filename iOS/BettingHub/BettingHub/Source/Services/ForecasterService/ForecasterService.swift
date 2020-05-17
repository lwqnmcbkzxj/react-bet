//
//  ForecasterService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecasterService {
    
    @LazyInjected private var reqBuilder: IRequestBuilder
    @LazyInjected private var httpClient: IHttpClient
    
    func forecastersListRequest(page: Int, count: Int) -> (RequestContent, URLRequest) {
        let url = "api/users"
        
        let params = [
            "page": String(page),
            "limit": String(count)
        ]
        
        let content = (url, params)
        let request = reqBuilder.getRequest(content: content)
        
        return (content, request)
    }
}

extension ForecasterService: IForecasterService {
    
    func topForecasters(count: Int, callback: ((Result<[Forecaster], BHError>) -> Void)?) {
        let req = forecastersListRequest(page: 1, count: 15).1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let forecasters = try? JSONDecoder().decode([Forecaster].self, from: data) else {
                    callback?(.failure(.unexpectedContent))
                    return
                }
                
                callback?(.success(forecasters))
                
            case .failure(let err):
                callback?(.failure(err.asBHError()))
            }
        }
    }
    
    func forecaster(id: Int, callback: ((Result<Forecaster, BHError>) -> Void)?) {
        fatalError("Not implemented")
    }
    
    
}
