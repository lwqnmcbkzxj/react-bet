//
//  UserInfo.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserInfo {
    
    let forecaster: Observable<Forecaster?>
    
    init(forecaster: Forecaster?) {
        self.forecaster = Observable(forecaster)
    }
}

struct UserInfoApiObject: Decodable {
    
    let forecaster: ForecasterApiObject
    
    init(from decoder: Decoder) throws {
        forecaster = try ForecasterApiObject(from: decoder)
    }
    
//    private enum CodingKeys: String, CodingKey {
//        case uid = "uid"
//        case login = "login"
//        case email = "email"
//        case emailVerifiedAt = "email_verified_at"
//        case emailNotifications = "is_email_notification"
//        case pushNotifications = "is_push_notification"
//        case platform = "platform"
//        case creationDate = "created_at"
//        case updateDate = "updated_at"
//        case providerId = "provider_id"
//        case provider = "provider"
//        case id = "id"
//        case balance = "balance"
//        case avatar = "avatar"
//        case ratingPosition = "rating_position"
//        case stats = "stats"
//        case lastFive = "last_five"
//    }
}
