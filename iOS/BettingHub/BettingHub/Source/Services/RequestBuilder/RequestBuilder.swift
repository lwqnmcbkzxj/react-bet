//
//  RequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class RequestBuilder: IRequestBuilder {
    
    let baseURL = BettingHub.baseURL
    
    func getRequest(content: RequestContent) -> URLRequest {
        let url = baseURL.appendingPathComponent(content.endpoint)
        
        let method = "GET"
        let headers = [
            "Accept": "application/json",
            "Connection": "keep-alive"
        ]
        
        var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!
        components.queryItems = content.params.keys.map { URLQueryItem(name: $0, value: content.params[$0]) }
        let reqUrl = try! components.asURL()
        
        var request = URLRequest(url: reqUrl)
        request.httpMethod = method
        request.allHTTPHeaderFields = headers
        
        return request
    }
    
    func jsonPostRequest(content: RequestContent) -> URLRequest {
        let url = baseURL.appendingPathComponent(content.endpoint)
        
        let method = "POST"
        let parametersEncoded = try! JSONEncoder().encode(content.params)
        let headers = [
            "Accept": "application/json",
            "Content-Length": "\(parametersEncoded.count)",
            "Content-Type": "application/json"
        ]
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.allHTTPHeaderFields = headers
        request.httpBody = parametersEncoded
        
        return request
    }
}
