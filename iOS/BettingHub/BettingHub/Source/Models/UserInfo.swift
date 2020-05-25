//
//  UserInfo.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct UserInfo: Decodable {
    
//    let uid: Int?
//    
//    let login: String
//    let email: String
//    let emailVerifiedAt: String?
//    let emailNotifications: Int
//    let pushNotifications: Int
//    let platform: String
//    let creationDate: String
//    let updateDate: String
//    let providerId: String?
//    let provider: String?
    
    //Forecaster
    let forecaster: Forecaster
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let id = try container.decode(Int.self, forKey: .id)
        let avatar = try container.decodeIfPresent(String.self, forKey: .avatar)
        let login = try container.decode(String.self, forKey: .login)
        let stats = try container.decode(ForecasterStatistics.self, forKey: .stats)
        let lastForecasts = try container.decode([Bool].self, forKey: .lastFive)
        let ratingPosition = try container.decode(Int.self, forKey: .ratingPosition)
        let balance = try container.decode(String.self, forKey: .balance).convert(to: Double.self) ?? 0
        forecaster = Forecaster(id: id, avatar: avatar, login: login, stats: stats, lastForecasts: lastForecasts, ratingPosition: ratingPosition, balance: balance)
        
    }
    
    private enum CodingKeys: String, CodingKey {
        case uid = "uid"
        case login = "login"
        case email = "email"
        case emailVerifiedAt = "email_verified_at"
        case emailNotifications = "is_email_notification"
        case pushNotifications = "is_push_notification"
        case platform = "platform"
        case creationDate = "created_at"
        case updateDate = "updated_at"
        case providerId = "provider_id"
        case provider = "provider"
        case id = "id"
        case balance = "balance"
        case avatar = "avatar"
        case ratingPosition = "rating_position"
        case stats = "stats"
        case lastFive = "last_five"
    }
}

//private extension UserInfo {
//
//    struct Stats: Codable {
//        let roi: Double
//        let averageCofficient: Double
//        let pureProfit: Double
//        let wins: Int
//        let loss: Int
//        let wait: Int
//        let back: Int
//        let subscribers: Int
//        let subscriptions: Int
//
//        init(from decoder: Decoder) throws {
//            let container = try decoder.container(keyedBy: CodingKeys.self)
//            roi = try container.decodeIfPresent(String.self, forKey: .roi)?
//                .convert(to: Double.self) ?? 0
//            averageCofficient = try container.decodeIfPresent(String.self, forKey: .averageCofficient)?
//                .convert(to: Double.self) ?? 0
//            pureProfit = try container.decodeIfPresent(String.self, forKey: .pureProfit)?
//                .convert(to: Double.self) ?? 0
//            wins = try container.decode(Int.self, forKey: .wins)
//            loss = try container.decode(Int.self, forKey: .loss)
//            wait = try container.decode(Int.self, forKey: .wait)
//            back = try container.decode(Int.self, forKey: .back)
//            subscribers = try container.decode(Int.self, forKey: .subscribers)
//            subscriptions = try container.decode(Int.self, forKey: .subscriptions)
//        }
//
//        private enum CodingKeys: String, CodingKey {
//            case roi = "roi"
//            case averageCofficient = "average_cofficient"
//            case pureProfit = "pure_profit"
//            case wins = "count_win"
//            case loss = "count_loss"
//            case wait = "count_wait"
//            case back = "count_back"
//            case subscribers = "count_subscribers"
//            case subscriptions = "count_subscriptions"
//        }
//
//        func toForecasterStats() -> ForecasterStatistics {
//            return ForecasterStatistics(roi: roi,
//                                        averageCoefficient: averageCofficient,
//                                        pureProfit: <#T##Double#>, wins: <#T##Int#>, loss: <#T##Int#>, wait: <#T##Int#>, back: <#T##Int#>, subscribers: <#T##Int#>, subscriptions: <#T##Int#>)
//        }
//    }
//}
