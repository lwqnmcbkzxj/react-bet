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
    
    static func stub() -> Forecaster {
        .init(id: 0,
              avatar: nil,
              login: "Test",
              stats: .stub(),
              lastForecasts: [false, true, true, false, true])
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case avatar = "avatar"
        case login = "login"
        case stats = "stats"
        case lastForecasts = "last_five"
        
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
        
        roi = try container.decode(String.self,
                                   forKey: .roi)
                           .convert(to: Double.self) ?? 0
        averageCoefficient = try container.decode(String.self,
                                                  forKey: .averageCoefficient)
                                          .convert(to: Double.self) ?? 0
        pureProfit = try container.decode(String.self,
                                          forKey: .pureProfit)
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
