//
//  ServiceLocator.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ServiceLocator {
    
    static let shared = ServiceLocator()
    
    private init() {}
    
    private(set) lazy var requestBuilder: IRequestBuilder = RequestBuilder()
    
    private(set) lazy var httpClient: IHttpClient = HttpClient()
    
    private(set) lazy var tokenService: ITokenService = TokenService()
    
    private(set) lazy var authService: IAuthService = AuthService(tokenService: tokenService,
                                                                  httpClient: httpClient,
                                                                  reqBuilder: requestBuilder)
}
