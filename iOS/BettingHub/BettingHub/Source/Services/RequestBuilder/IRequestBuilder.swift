//
//  IRequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation


let baseURL = URL(string: "http://betting-hub.sixhands.co")!

typealias RequestContent = (endpoint: String, params: [String: String])


protocol IRequestBuilder: class {
    
    var baseURL: URL { get }
    
    func getRequest(content: RequestContent) -> URLRequest
    
    func jsonPostRequest(content: RequestContent) -> URLRequest
}
