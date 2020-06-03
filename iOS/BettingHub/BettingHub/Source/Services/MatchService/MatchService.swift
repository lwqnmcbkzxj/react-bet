//
//  MatchService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class MatchService {
    
    @LazyInjected private var httpClient: IHttpClient
    @LazyInjected private var reqBuilder: IRequestBuilder
    
    func matchesRequest(page: Int, limit: Int) -> (RequestContent, URLRequest) {
        let url = "api/events"
        let content = reqBuilder.pagedRequest(url: url, page: page, limit: limit)
        let result = (content, reqBuilder.getRequest(content: content))
        return result
    }
    
    func matchRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/events/\(id)"
        let params = [String: String]()
        let content = (url, params)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
}

extension MatchService: IMatchService {
    
    
    func matches(page: Int, count: Int,
                 callback: (ServiceCallback<[Match]>)?) {
        let req = matchesRequest(page: page, limit: count).1
        httpClient.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .map { $0.decodePaged(pageElement: Match.self) }
                .mapError { $0.asBHError() }
                .onSuccess { $0.invokeCallback(callback) }
                .onFailure { callback(.failure($0)) }
        }
    }
    
    func match(id: Int,
               callback: (ServiceCallback<Match>)?) {
        let req = matchRequest(id: id).1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let match = try? JSONDecoder().decode(Match.self, from: data) else {
                    callback?(.failure(.unexpectedContent))
                    return
                }

                callback?(.success(match))
                
            case .failure(let err):
                callback?(.failure(err.asBHError()))
            }
        }
    }
    
    
}
