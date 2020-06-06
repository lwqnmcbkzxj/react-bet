//
//  IRequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

#if DEBUG
//    let baseURL = URL(string: "http://betting-hub.sixhands.co")!
    let baseURL = URL(string: "https://app.betthub.org")!
#else
    let baseURL = URL(string: "https://app.betthub.org")!
#endif


typealias RequestContent = (endpoint: String, params: [String: String])


protocol IRequestBuilder: class {
    
    var baseURL: URL { get }
    
    var autoAuthorization: Bool { get set }
    
    func authorize(_ request: URLRequest) -> URLRequest?
    
    
    
    func pagedRequest(url: String, page: Int, limit: Int) -> RequestContent
    
    func idRequest(url: String, id: Int) -> RequestContent
    
    func addParams(to content: RequestContent, params: [String: String]) -> RequestContent
    
    
    
    func getRequest(content: RequestContent) -> URLRequest
    
    func getRequest(fullUrl: URL, params: [String: String]) -> URLRequest
    
    
    
    func jsonPostRequest(content: RequestContent) -> URLRequest
}
