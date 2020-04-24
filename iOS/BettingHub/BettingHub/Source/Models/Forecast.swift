//
//  Forecast.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecast: Codable {
    
    let forecastId: Int
    let userName: String
    let userAvatar: String
    let sportName: String //TODO: change to sport code after backend is ready
    let tournament: String
    let time: String //TODO: change to Date with init from unixTime after backend is ready
    let text: String
    let betValue: Double
    let cratedAt: String //TODO: change to Date with init from unixTime after backend is ready
    let coefficient: Double
    let commentsQuanity: Int
    let rating: Int
    let favAmmount: Int
    
    init(forecastId: Int, userName: String, userAvatar: String, sportName: String, tournament: String, time: String, text: String, betValue: Double, cratedAt: String, coefficient: Double, commentsQuanity: Int, rating: Int, favAmmount: Int) {
        self.forecastId = forecastId
        self.userName = userName
        self.userAvatar = userAvatar
        self.sportName = sportName
        self.tournament = tournament
        self.time = time
        self.text = text
        self.betValue = betValue
        self.cratedAt = cratedAt
        self.coefficient = coefficient
        self.commentsQuanity = commentsQuanity
        self.rating = rating
        self.favAmmount = favAmmount
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        forecastId = try container.decode(Int.self, forKey: .forecastId)
        userName = try container.decode(String.self, forKey: .userName)
        userAvatar = try container.decode(String.self, forKey: .userAvatar)
        sportName = try container.decode(String.self, forKey: .sportName)
        tournament = try container.decode(String.self, forKey: .tournament)
        time = try container.decode(String.self, forKey: .time)
        text = try container.decode(String.self, forKey: .text)
        betValue = try container.decode(String.self, forKey: .betValue).convert(to: Double.self)!
        cratedAt = try container.decode(String.self, forKey: .cratedAt)
        coefficient = try container.decode(String.self, forKey: .coefficient).convert(to: Double.self)!
        commentsQuanity = try container.decode(Int.self, forKey: .commentsQuanity)
        rating = try container.decode(Int.self, forKey: .rating)
        favAmmount = try container.decode(Int.self, forKey: .favAmmount)
        
        
    }
    
    private enum CodingKeys: String, CodingKey {
        case forecastId = "ForecastId"
        case userName = "UserName"
        case userAvatar = "UserAvatar"
        case sportName = "SportName"
        case tournament = "Tournament"
        case time = "Time"
        case text = "Text"
        case betValue = "BetValue"
        case cratedAt = "CratedAt"
        case coefficient = "Coefficient"
        case commentsQuanity = "CommentsQuanity"
        case rating = "Rating"
        case favAmmount = "FavAmmount"
    }
    
    static func stub() -> Forecast {
        Forecast(forecastId: 0,
                 userName: "Никнейм",
                 userAvatar: "",
                 sportName: "Футбол",
                 tournament: "Dota 2. StayHome Challenge (матчи из 3-х карт)",
                 time: "",
                 text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
                 betValue: 550,
                 cratedAt: "",
                 coefficient: 1.64,
                 commentsQuanity: 10,
                 rating: 23,
                 favAmmount: 54)
    }
}
