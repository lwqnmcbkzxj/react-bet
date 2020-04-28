//
//  Bookmaker.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Bookmaker {
    let image: String?
    let rating: Double
    let bonus: Double
    
    static func stub() -> Bookmaker {
        return .init(image: nil, rating: 9.4, bonus: 1337)
    }
}
