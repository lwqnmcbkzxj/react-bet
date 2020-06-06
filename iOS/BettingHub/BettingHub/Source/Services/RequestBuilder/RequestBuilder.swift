//
//  RequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class RequestBuilder: IRequestBuilder {
    
    @LazyInjected
    private var tokenService: ITokenService
    
    let baseURL = BettingHub.baseURL
    
    var autoAuthorization: Bool = true
    
    func authorize(_ request: URLRequest) -> URLRequest? {
        
        let header = "Authorization"
        
        if request.allHTTPHeaderFields?[header] != nil { return request }
        
        let tokenRes = tokenService.authToken()
        switch tokenRes {
        case .success(let token):
            var newRequest = request
            newRequest.addValue("Bearer \(token)", forHTTPHeaderField: header)
            return newRequest
        case .failure(let err):
            print(err)
            return nil
        }
    }
    
    func getRequest(content: RequestContent) -> URLRequest {
        let url = baseURL.appendingPathComponent(content.endpoint)
        
        let req = getRequest(fullUrl: url, params: content.params)
        
        return req
    }
    
    func getRequest(fullUrl url: URL, params: [String : String]) -> URLRequest {
        
        let method = "GET"
        let headers = [
            "Accept": "application/json",
            "Connection": "keep-alive"
        ]
        
        var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!
        components.queryItems = params.keys.map { URLQueryItem(name: $0, value: params[$0]) }
        let reqUrl = try! components.asURL()
        
        var request = URLRequest(url: reqUrl)
        request.httpMethod = method
        request.allHTTPHeaderFields = headers
        
        if autoAuthorization {
            request = self.authorize(request) ?? request
        }
        
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
    
    func pagedRequest(url: String, page: Int, limit: Int) -> RequestContent {
        let params = [
            "page": String(page),
            "limit": String(limit)
        ]
        
        return (url, params)
    }
    
    func idRequest(url: String, id: Int) -> RequestContent {
        return ("\(url)/\(id)", [String: String]())
    }
    
    func addParams(to content: RequestContent, params: [String : String]) -> RequestContent {
        var new = content.params
        params.keys.forEach { (key) in
            guard new[key] == nil else { fatalError("adding params overrides old values") }
            new[key] = params[key]
        }
        
        return (content.endpoint, new)
    }
}
