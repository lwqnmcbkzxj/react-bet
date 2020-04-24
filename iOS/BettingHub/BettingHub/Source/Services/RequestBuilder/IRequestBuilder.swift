//
//  IRequestBuilder.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IRequestBuilder: class {
    
    func registerRequest(username: String, email: String, password: String) -> URLRequest
    
    func loginRequest(usernameOrEmail: String, password: String) -> URLRequest
    
    func userInfo() -> Result<URLRequest, Error>
}
