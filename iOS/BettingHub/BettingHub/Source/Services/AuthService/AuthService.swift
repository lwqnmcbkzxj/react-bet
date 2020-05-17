//
//  AuthService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class AuthService {
    
    @LazyInjected private var tokenService: ITokenService
    @LazyInjected private var httpClient: IHttpClient
    @LazyInjected private var reqBuilder: IRequestBuilder
    
    func registerRequest(username: String, email: String, password: String) -> (RequestContent, URLRequest) {
        let endpoint = "api/register"
        
        let paramsDict: [String: String] = [
            "username": username,
            "email": email,
            "password": password
        ]
        
        let content = (endpoint, paramsDict)
        let req = reqBuilder.jsonPostRequest(content: content)
        
        return (content, req)
    }
    
    func loginRequest(usernameOrEmail: String, password: String) -> (RequestContent, URLRequest) {
        let endpoint = "oauth/token"
        
        let paramsDict: [String: String] = [
            "grant_type": "password",
            "client_id": "2",
            "client_secret": "V79SdKGIlqFgbmlRGLNIm5r8wPevKerRePbqwzDT",
            "username": usernameOrEmail,
            "password": password
        ]
        
        let content = (endpoint, paramsDict)
        let req = reqBuilder.jsonPostRequest(content: content)
        
        return (content, req)
    }
}

extension AuthService: IAuthService {
    
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
        let req = registerRequest(username: username, email: email, password: password).1
        httpClient.authRequest(request: req) { (error) in
            callback(error)
        }
    }
    
    func logIn(usernameOrMail: String, password: String, callback: @escaping ((BHError?) -> Void)) {
        let req = loginRequest(usernameOrEmail: usernameOrMail, password: password).1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data):
                guard let authToken = try? JSONDecoder().decode(AuthToken.self, from: data) else {
                    callback(.unexpectedContent)
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
