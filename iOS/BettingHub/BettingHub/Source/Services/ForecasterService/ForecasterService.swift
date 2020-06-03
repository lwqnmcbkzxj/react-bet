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
    @LazyInjected private var authService: IAuthService
    
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
    
    func subscribeRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/users/\(id)/subscription"
        let params = [String: String]()
        let content = (url, params)
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
}

extension ForecasterService: IForecasterService {
    
    func topForecasters(page: Int, count: Int, callback: ((Result<[Forecaster], BHError>) -> Void)?) {
        let req = forecastersListRequest(page: page, count: count).1
        httpClient.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .map { $0.decodePaged(pageElement: Forecaster.self) }
                .mapError { $0.asBHError() }
                .onSuccess { $0.invokeCallback(callback)}
                .onFailure { callback(.failure($0)) }
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
    
    func subscribe(forecaster: Forecaster, callback: (ServiceCallback<Bool>)?) {
        if authService.authError != nil { return }
        let req = subscribeRequest(id: forecaster.id).1
        httpClient.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .mapError { $0.asBHError() }
                .onSuccess { _ in callback(.success(true)) }
                .onFailure { callback(.failure($0))}
        }
    }
}
