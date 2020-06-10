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
    
    func isOpposite(to status: RatingStatus) -> Bool {
        switch (self, status) {
        case (.like, .dislike), (.dislike, .like): return true
        default: return false
        }
    }
    
    func changeInPoints(for status: RatingStatus) -> Int {
        switch (self, status) {
        case (.like, .like), (.dislike, .dislike), (.none, .none): return 0
        case (.like, .dislike): return -2
        case (.dislike, .like): return 2
        case (.none, .like): return 1
        case (.like, .none): return -1
        case (.none, .dislike): return -1
        case (.dislike, .none): return 1
        }
    }
    
    func endpointBool(for status: RatingStatus) -> Bool {
        let final = apply(status: status)
        
        let map = [
            RatingStatus.like: true,
            RatingStatus.dislike: false,
            RatingStatus.none: self == .like ? true : false
        ]
        
        return map[final]!
    }
    
    private func apply(status: RatingStatus) -> RatingStatus {
        switch (self, status) {
        case (.like, .like), (.dislike, .dislike): return .none
        case (.like, .dislike): return .dislike
        case (.dislike, .like): return .like
        case (.none, _): return status
        case (_, .none): return .none
        }
    }
}

extension RatingStatus: Codable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let str = try container.decode(String?.self) ?? ""
        self = RatingStatus(rawValue: str) ?? .none
    }
}
