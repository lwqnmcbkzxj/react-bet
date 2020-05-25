//
//  Bookmaker.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Bookmaker: Decodable {
    let id: Int
    let title: String
    let rating: Double
    let bonus: Double
    let link: String
    let image: String
    
    static func stub() -> Bookmaker {
        return .init(id: 0, title: "Fonbet", rating: 9.3, bonus: 2000, link: "https://www.fonbet.ru", image: "/storage/bookmakers/fonbet.png")
    }
}
