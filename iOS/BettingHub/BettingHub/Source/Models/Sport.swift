//
//  Sport.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

enum Sport: String {
    case all
    case football
    case tennis
    case basketball
    case hockey
    case other
    
    static func getAll() -> [Sport] {
        return [.all, .football, .tennis, .basketball, .hockey, .other]
    }
}
