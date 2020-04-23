//
//  RequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class RequestBuilder: IRequestBuilder {
    
    private let baseURL = URL(string: "http://betting-hub.sixhands.co")!
    
    func registerRequest(username: String, email: String, password: String) -> URLRequest {
        let url = baseURL.appendingPathComponent("api/register")
        
        
        let paramsDict: [String: String] = [
            "username": username,
            "email": email,
            "password": password
        ]
        
        let req = jsonPostRequest(url: url, params: paramsDict)
        
        return req
    }
    
    func loginRequest(usernameOrEmail: String) {}
    
    private func jsonPostRequest(url: URL, params: [String: String]) -> URLRequest {
        
        let method = "POST"
        let parametersEncoded = try! JSONEncoder().encode(params)
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
