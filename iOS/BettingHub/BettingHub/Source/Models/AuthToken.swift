//
//  AuthToken.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct AuthToken: Codable {
    let access_token: String
    let refresh_token: String
    let expires_in: Double
}
