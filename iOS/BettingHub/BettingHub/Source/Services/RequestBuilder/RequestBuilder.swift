//
//  RequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

let baseURL = URL(string: "http://betting-hub.sixhands.co")!

class RequestBuilder: IRequestBuilder {
    
    private let baseURL = BettingHub.baseURL
    
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
    
    func loginRequest(usernameOrEmail: String, password: String) -> URLRequest {
        let url = baseURL.appendingPathComponent("oauth/token")
        
        let paramsDict: [String: String] = [
            "grant_type": "password",
            "client_id": "2",
            "client_secret": "V79SdKGIlqFgbmlRGLNIm5r8wPevKerRePbqwzDT",
            "username": usernameOrEmail,
            "password": password
        ]
        
        let req = jsonPostRequest(url: url, params: paramsDict)
        
        return req
    }
    
    func forecastsList(page: Int, quantity: Int,
                       timeFrame: TimeFrame, sport: Sport,
                       subscribers: Bool, favorites: Bool) -> URLRequest {
        let url = baseURL.appendingPathComponent("api/forecastList")
        
        var params: [String: String] = [
                "page": String(page),
                "limit": String(quantity),
//                "time": timeFrame.rawValue,
//                "sport_id": sport.rawValue,
//                "useSubscribes": subscribers ? "1" : "0",
//                "useFavorites": favorites ? "1" : "0"
        ]
        
        if timeFrame != .all { params["time"] = String(timeFrame.getLengthInHours()) }
        if sport != .all { params["sport_id"] = String(sport.rawValue) }
        
        let req = jsonPostRequest(url: url, params: params)
        
        return req
    }
}

private extension RequestBuilder {
    
    func jsonPostRequest(url: URL, params: [String: String]) -> URLRequest {
        
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
