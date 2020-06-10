//
//  Forecaster.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class Forecaster {
    
    let id: Int
    
    let avatar: Observable<String?>
    let login: Observable<String>
    let stats: Observable<ForecasterStatistics>
    let lastForecasts: Observable<[Bool]>
    let ratingPosition: Observable<Int?>
    let balance: Observable<Double?>
    let subscribed: Observable<Bool>
    let subscribers: Observable<Int>
    let subscriptions: Observable<Int>
    
    init(id: Int, avatar: String?, login: String, stats: ForecasterStatistics, lastForecasts: [Bool], ratingPosition: Int?, balance: Double?, subscribed: Bool, subscribers: Int, subscriptions: Int) {
        self.id = id
        self.avatar = Observable(avatar)
        self.login = Observable(login)
        self.stats = Observable(stats)
        self.lastForecasts = Observable(lastForecasts)
        self.ratingPosition = Observable(ratingPosition)
        self.balance = Observable(balance)
        self.subscribed = Observable(false)
        self.subscribers = Observable(subscribers)
        self.subscriptions = Observable(subscriptions)
    }
    
    
    
    static func stub() -> Forecaster {
        .init(id: 0,
              avatar: nil,
              login: "Test",
              stats: .stub(),
              lastForecasts: [false, true, true, false, true],
              ratingPosition: 10,
              balance: 1000,
              subscribed: false,
              subscribers: 10,
              subscriptions: 5)
    }
}

struct NumberDecoder: Decodable {
    let intValue: Int
    let doubleValue: Double
    let strValue: String
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        
        if let value = try? container.decode(Double.self) {
            self.doubleValue = value
            self.strValue = String(format: "%.2f", value)
            self.intValue = Int(value)
        } else if let value = try? container.decode(Int.self) {
            self.intValue = value
            self.doubleValue = Double(value)
            self.strValue = value.description
        } else if let value = try? container.decode(String.self) {
            self.strValue = value
            guard let int = Int(value) else { throw BHError.cantDecodeNumber }
            self.intValue = int
            self.doubleValue = Double(int)
        } else {
            throw BHError.cantDecodeNumber
        }
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
    
    init(roi: Double, averageCoefficient: Double, pureProfit: Double, wins: Int, loss: Int, wait: Int, back: Int) {
        self.roi = roi
        self.averageCoefficient = averageCoefficient
        self.pureProfit = pureProfit
        self.wins = wins
        self.loss = loss
        self.wait = wait
        self.back = back
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        roi = try container.decodeIfPresent(NumberDecoder.self, forKey: .roi)?.doubleValue ?? 0
        averageCoefficient = try container.decodeIfPresent(NumberDecoder.self, forKey: .averageCoefficient)?.doubleValue ?? 0
        pureProfit = try container.decode(NumberDecoder.self, forKey: .pureProfit).doubleValue
        wins = try container.decode(NumberDecoder.self, forKey: .wins).intValue
        loss = try container.decode(NumberDecoder.self, forKey: .loss).intValue
        wait = try container.decode(NumberDecoder.self, forKey: .wait).intValue
        back = try container.decode(NumberDecoder.self, forKey: .back).intValue
    }
    
    static func stub() -> ForecasterStatistics {
        .init(roi: 1.4,
              averageCoefficient: 2,
              pureProfit: 400,
              wins: 10,
              loss: 8,
              wait: 1,
              back: 2)
    }
    
    private enum CodingKeys: String, CodingKey {
        case roi = "roi"
        case averageCoefficient = "average_cofficient"
        case pureProfit = "pure_profit"
        case wins = "count_win"
        case loss = "count_loss"
        case wait = "count_wait"
        case back = "count_back"
    }
}

struct ForecasterApiObject: Decodable {
    let id: Int
    let avatar: String?
    let login: String
    let stats: ForecasterStatistics
    let lastForecasts: [Bool]
    let ratingPosition: Int?
    let balance: Double?
    let subscribed: Bool
    let subscribers: Int
    let subscriptions: Int


    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        avatar = try container.decode(String?.self, forKey: .avatar)
        login = try container.decode(String.self, forKey: .login)
        stats = try container.decode(ForecasterStatistics.self, forKey: .stats)
        lastForecasts = try container.decode([Bool].self, forKey: .lastForecasts)
        
        ratingPosition = try container.decodeIfPresent(Int.self, forKey: .ratingPosition)
        balance = try container.decodeIfPresent(Double.self, forKey: .balance) ?? 0
        
        subscribed = try container.decodeIfPresent(Bool.self, forKey: .subscribed) ?? false
        
        let subs = try container.decode(SubsData.self, forKey: .stats)
        subscribers = subs.subscribers
        subscriptions = subs.subscriptions
    }

    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case avatar = "avatar"
        case login = "login"
        case stats = "stats"
        case lastForecasts = "last_five"
        case ratingPosition = "rating_position"
        case balance = "balance"
        case subscribed = "is_subscribed"
    }
}

fileprivate struct SubsData: Decodable {
    let subscribers: Int
    let subscriptions: Int
    
    private enum CodingKeys: String, CodingKey {
        case subscribers = "count_subscribers"
        case subscriptions = "count_subscriptions"
    }
}

