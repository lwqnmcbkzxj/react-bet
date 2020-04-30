//
//  TimeFrame.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum TimeFrame: String {
    case h3 = "3h"
    case h6 = "6h"
    case h12 = "12h"
    case day = "day"
    case month = "m"
    case all = "all"
    
    var localized: String {
        switch self {
        case .month:
            return Text.month
        case .all:
            return Text.allTime
        default:
            return rawValue.localized
        }
    }
}
