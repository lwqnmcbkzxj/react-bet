//
//  TimeFrame.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum TimeFrame {
    case month
    case all
    
    var localized: String {
        switch self {
        case .month:
            return Text.month.localized
        case .all:
            return Text.allTime
        }
    }
    
    func getLengthInHours() -> Int {
        [.month: 24 * 30,
         .all: 0][self]!
    }
}
