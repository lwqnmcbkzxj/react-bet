//
//  Forecaster.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecaster: Codable {
    let username: String
    let profilePicture: String?
    let income: Double
    
    let wins: Int
    let loses: Int
    let draws: Int
    
    let subscribers: Int
    let ratingPosition: Int
    let netProfit: Double
    
    static func stub() -> Forecaster {
        return .init(username: "Никнейм",
                     profilePicture: nil,
                     income: 50,
                     wins: 10,
                     loses: 8,
                     draws: 2,
                     subscribers: 10,
                     ratingPosition: 3,
                     netProfit: 268)
        
    }
}
