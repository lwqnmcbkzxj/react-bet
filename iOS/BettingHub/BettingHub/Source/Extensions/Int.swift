//
//  Int.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

extension Int {
    
    var placesCount: Int {
        var copy = self
        var counter = 1
        while copy > 0 {
            copy = copy / 10
            counter += 1
        }
        
        return counter
    }
}
