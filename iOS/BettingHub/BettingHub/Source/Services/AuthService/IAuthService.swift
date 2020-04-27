//
//  IAuthService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IAuthService: class {
    
    var isAuthorized: BHError? { get }
    
    func register(username: String, email: String, password: String, callback: @escaping ((BHError?) -> Void))
    
    func logIn(usernameOrMail: String, password: String, callback: @escaping ((BHError?) -> Void))
}
