//
//  TokenService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class TokenService: ITokenService {
    
    let tokenKey: String = "authToken"
    
    func authToken() -> Result<String, BHError> {
        guard let token = getAuthTokenFromDefaults() else {
            return .failure(.unspecified)
        }
        
        return .success(token.access_token)
    }
    
    func refreshToken() -> Result<String, BHError> {
        guard let token = getAuthTokenFromDefaults() else {
            return .failure(.unspecified)
        }
        
        return .success(token.refresh_token)
    }
    
    func saveAuthToken(_ token: AuthToken) {
        guard let serialized = try? JSONEncoder().encode(token) else { return }
        UserDefaults.standard.setValue(serialized, forKey: tokenKey)
    }
}

private extension TokenService {
    private func getAuthTokenFromDefaults() -> AuthToken? {
        guard
            let data = UserDefaults.standard.data(forKey: tokenKey),
            let token = try? JSONDecoder().decode(AuthToken.self, from: data)
        else { return nil}
        
        return token
    }
}
