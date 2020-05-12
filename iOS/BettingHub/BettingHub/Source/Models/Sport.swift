//
//  Sport.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

enum Sport: Int {
    case all = 0
    case football = 1
    case tennis = 2
    case basketball = 3
    case hockey = 4
    case other = 5
    
    var sportName: String {
        [
            .all: "all",
            .football: "football",
            .tennis: "tennis",
            .basketball: "basketball",
            .hockey: "hockey",
            .other: "other"
        ][self]!
    }
    
    static func getAll() -> [Sport] {
        return [.all, .football, .tennis, .basketball, .hockey, .other]
    }
}
