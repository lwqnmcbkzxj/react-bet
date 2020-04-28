//
//  Match.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Match {
    let date: Date
    let sport: Sport
    let name: String
    let season: String
    let bets: Int
    
    static func stub() -> Match {
        return .init(date: Date(),
                     sport: .football,
                     name: "Mousesports - Virtus.pro",
                     season: "LPL Pro League Season 4",
                     bets: 122)
    }
}
