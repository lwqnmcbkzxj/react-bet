//
//  ITokenService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ITokenService: class {
    
    func authToken() -> Result<String, BHError>
    
    func refreshToken() -> Result<String, BHError>
    
    func saveAuthToken(_ token: AuthToken)
}
