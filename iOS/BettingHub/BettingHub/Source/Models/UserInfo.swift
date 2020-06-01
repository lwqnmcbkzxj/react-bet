//
//  UserInfo.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct UserInfo: Codable {
    
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
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(forecaster.id, forKey: .id)
        try container.encode(forecaster.avatar, forKey: .avatar)
        try container.encode(forecaster.login, forKey: .login)
        try container.encode(forecaster.stats, forKey: .stats)
        try container.encode(forecaster.lastForecasts, forKey: .lastFive)
        try container.encode(forecaster.ratingPosition, forKey: .ratingPosition)
        try container.encode(forecaster.balance, forKey: .balance)
        
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
