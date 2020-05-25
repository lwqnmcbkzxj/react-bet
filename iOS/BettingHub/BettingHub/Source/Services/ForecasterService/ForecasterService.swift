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
        let content = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        let result = (content, reqBuilder.getRequest(content: content))
        return result
    }
    
    func forecaster(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/users/\(id)"
        let params = [String: String]()
        let content = (url, params)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    //TODO: change on backend
    private func getForecasters(from data: Data) -> [Forecaster]? {
        
        struct ForecastersResponse: Codable {
            let data: [Forecaster]
        }
        
        let res = try? JSONDecoder().decode(ForecastersResponse.self, from: data)
        return res?.data
    }
}

extension ForecasterService: IForecasterService {
    
    func topForecasters(page: Int, count: Int, callback: ((Result<[Forecaster], BHError>) -> Void)?) {
        let req = forecastersListRequest(page: page, count: count).1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let forecasters = self.getForecasters(from: data) else {
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
        let req = forecaster(id: id).1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data): callback?(data.decodeJSON(Forecaster.self))
            case .failure(let err): callback?(.failure(err.asBHError()))
            }
        }
    }
    
    
}
