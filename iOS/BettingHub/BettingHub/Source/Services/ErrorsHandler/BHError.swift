//
//  BHError.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum BHError: Int, Error {
    
    case userAlreadyRegistered
    case userUnauthorized
    case tokenExpired
    case unspecified
    case unexpectedContent
}

extension Error {
    func asBHError() -> BHError {
        return (self as? BHError) ?? .unspecified
    }
}
