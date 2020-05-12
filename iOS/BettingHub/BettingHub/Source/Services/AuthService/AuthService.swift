//
//  AuthService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class AuthService: IAuthService {
    
    let tokenService: ITokenService
    let httpClient: IHttpClient
    let reqBuilder: IRequestBuilder
    
    init(tokenService: ITokenService, httpClient: IHttpClient, reqBuilder: IRequestBuilder) {
        self.tokenService = tokenService
        self.httpClient = httpClient
        self.reqBuilder = reqBuilder
    }
    
    var isAuthorized: BHError? {
        let authToken = tokenService.authToken()
        switch authToken {
        case .success(_):
            return nil
            
        case .failure(let error):
            return error
        }
    }
    
    func register(username: String, email: String, password: String, callback: @escaping ((BHError?) -> Void)) {
        let req = reqBuilder.registerRequest(username: username, email: email, password: password)
        httpClient.authRequest(request: req) { (error) in
            callback(error)
        }
    }
    
    func logIn(usernameOrMail: String, password: String, callback: @escaping ((BHError?) -> Void)) {
        let req = reqBuilder.loginRequest(usernameOrEmail: usernameOrMail,
                                          password: password)
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let authToken = try? JSONDecoder().decode(AuthToken.self, from: data) else {
                    callback(.unspecified)
                    return
                }
                
                self.tokenService.saveAuthToken(authToken)
                callback(nil)
                
            case .failure(let err):
                callback(err.asBHError())
            }
        }
    }
    
    func logOut() {
        tokenService.deleteToken()
    }
}
