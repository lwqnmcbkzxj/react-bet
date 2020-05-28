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
    let content: String?
    let rating: Double
    let bonus: Double
    let link: String
    let image: String
    
    static func stub() -> Bookmaker {
        return .init(id: 0,
                     title: "1XСтавка",
                     content: "Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker.Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker.",
                     rating: 9.4,
                     bonus: 4000,
                     link: "https://1xstavka.ru",
                     image: "/storage/bookmakers/1xstavka.png")
    }
}
