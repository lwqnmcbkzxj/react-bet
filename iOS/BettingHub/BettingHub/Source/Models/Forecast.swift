//
//  Forecast.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecast {
    let forecastId: Int
    let userName: String
    let userAvatar: String
    let sportName: String
    let tournament: String
    let time: Date
    let text: String
    let betValue: String
    let cratedAt: Date
    let coefficient: Double
    let commentsQuanity: Int
    let rating: Int
    let favAmmount: Int
    
    
    static func stub() -> Forecast {
        Forecast(forecastId: 0,
                 userName: "Никнейм",
                 userAvatar: "",
                 sportName: "Футбол",
                 tournament: "Dota 2. StayHome Challenge (матчи из 3-х карт)",
                 time: Date(timeInterval: 123456, since: Date()),
                 text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
                 betValue: "550",
                 cratedAt: Date(),
                 coefficient: 1.64,
                 commentsQuanity: 10,
                 rating: 23,
                 favAmmount: 54)
    }
}
