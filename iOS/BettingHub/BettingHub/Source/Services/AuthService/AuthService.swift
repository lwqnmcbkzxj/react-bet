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
    @LazyInjected private var userService: IUserService
    @LazyInjected private var coordinator: AppCoordinator
    
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
    
    var authError: BHError? {
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
        userService.clearInfo()
        
    }
    
    func url(for network: SocialNetwork) -> URL {
       
        let redirectStr = "?redirect_to=betthub://auth"
        
        let urlStr =
        [
            SocialNetwork.vk: "https://app.betthub.org/api/login/vkontakte\(redirectStr)",
            SocialNetwork.google: "https://app.betthub.org/api/login/google\(redirectStr)",
            SocialNetwork.facebook: "https://app.betthub.org/api/login/facebook\(redirectStr)"
        ][network]!
        
        let url = URL(string: urlStr)!
        
        return url
    }
    
    func redirectedAuth(with url: URL) {
        guard
            let components = URLComponents(url: url, resolvingAgainstBaseURL: true),
            let params = components.queryItems,
            let token = params.first(where: { $0.name == "token" })?.value
        else { return }
        
        let oneYear: TimeInterval = 60 * 60 * 24 * 365 //365 days
        let auth = AuthToken(access_token: token, refresh_token: "", expires_in: oneYear)
        tokenService.saveAuthToken(auth)
        
        userService.reloadInfo { (err) in
            if let err = err {
                print(err)
            }
            
            let isAuthorized = self.authError == nil && err == nil
            self.coordinator.mainTabBar.setState(isAuthorized: isAuthorized)
        }
    }
}
