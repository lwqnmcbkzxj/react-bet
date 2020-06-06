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
        [.month: Text.month.localized,
         .all: Text.allTime][self]!
    }
    
    func getLengthInHours() -> Int {
        [.month: 24 * 31,
         .all: 0][self]!
    }
}
