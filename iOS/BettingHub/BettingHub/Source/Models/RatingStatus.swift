//
//  RatingStatus.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum RatingStatus: String {
    case like
    case dislike
    case none
}

extension RatingStatus: Codable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let str = try container.decode(String?.self) ?? ""
        self = RatingStatus(rawValue: str) ?? .none
    }
}
