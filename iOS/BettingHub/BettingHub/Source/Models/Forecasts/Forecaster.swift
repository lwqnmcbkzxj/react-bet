//
//  Forecaster.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecaster: Codable {
    
    let id: Int
    let avatar: String?
    let login: String
    let stats: ForecasterStatistics
    let lastForecasts: [Bool]
    let ratingPosition: Int?
    let balance: Double?
    
    init(id: Int, avatar: String?, login: String, stats: ForecasterStatistics, lastForecasts: [Bool], ratingPosition: Int?, balance: Double?) {
        self.id = id
        self.avatar = avatar
        self.login = login
        self.stats = stats
        self.lastForecasts = lastForecasts
        self.ratingPosition = ratingPosition
        self.balance = balance
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        avatar = try container.decode(String?.self, forKey: .avatar)
        login = try container.decode(String.self, forKey: .login)
        stats = try container.decode(ForecasterStatistics.self, forKey: .stats)
        lastForecasts = try container.decode([Bool].self, forKey: .lastForecasts)
        ratingPosition = try container.decodeIfPresent(Int.self, forKey: .ratingPosition)
        balance = try container.decodeIfPresent(String.self, forKey: .balance)?.convert(to: Double.self)!
        
        
    }
    
    static func stub() -> Forecaster {
        .init(id: 0,
              avatar: nil,
              login: "Test",
              stats: .stub(),
              lastForecasts: [false, true, true, false, true],
              ratingPosition: 10,
              balance: 1000)
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case avatar = "avatar"
        case login = "login"
        case stats = "stats"
        case lastForecasts = "last_five"
        case ratingPosition = "rating_position"
        case balance = "balance"
    }
}

struct ForecasterStatistics: Codable {
    let roi: Double
    let averageCoefficient: Double
    let pureProfit: Double
    let wins: Int
    let loss: Int
    let wait: Int
    let back: Int
    let subscribers: Int
    let subscriptions: Int
    
    init(roi: Double, averageCoefficient: Double, pureProfit: Double, wins: Int, loss: Int, wait: Int, back: Int, subscribers: Int, subscriptions: Int) {
        self.roi = roi
        self.averageCoefficient = averageCoefficient
        self.pureProfit = pureProfit
        self.wins = wins
        self.loss = loss
        self.wait = wait
        self.back = back
        self.subscribers = subscribers
        self.subscriptions = subscriptions
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        roi = try container.decodeIfPresent(String.self,
                                   forKey: .roi)?
                           .convert(to: Double.self) ?? 0
        averageCoefficient = try container.decodeIfPresent(String.self,
                                                  forKey: .averageCoefficient)?
                                          .convert(to: Double.self) ?? 0
        pureProfit = try container.decodeIfPresent(String.self,
                                          forKey: .pureProfit)?
                                  .convert(to: Double.self) ?? 0
        wins = try container.decode(Int.self, forKey: .wins)
        loss = try container.decode(Int.self, forKey: .loss)
        wait = try container.decode(Int.self, forKey: .wait)
        back = try container.decode(Int.self, forKey: .back)
        subscribers = try container.decode(Int.self, forKey: .subscribers)
        subscriptions = try container.decode(Int.self, forKey: .subscriptions)
    }
    
    static func stub() -> ForecasterStatistics {
        .init(roi: 1.4,
              averageCoefficient: 2,
              pureProfit: 400,
              wins: 10,
              loss: 8,
              wait: 1,
              back: 2,
              subscribers: 10,
              subscriptions: 10)
    }
    
    private enum CodingKeys: String, CodingKey {
        case roi = "roi"
        case averageCoefficient = "average_cofficient"
        case pureProfit = "pure_profit"
        case wins = "count_win"
        case loss = "count_loss"
        case wait = "count_wait"
        case back = "count_back"
        case subscribers = "count_subscribers"
        case subscriptions = "count_subscriptions"
    }
}
