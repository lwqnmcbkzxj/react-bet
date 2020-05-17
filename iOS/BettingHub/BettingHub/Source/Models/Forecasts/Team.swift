//
//  Team.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Team: Codable {
    let name: String
    
    static func stub() -> Team {
        .init(name: "Test team")
    }
}
