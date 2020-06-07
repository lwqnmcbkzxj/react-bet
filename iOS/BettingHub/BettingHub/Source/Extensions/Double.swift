//
//  Double.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

extension Double {
    
    func description(f: Int) -> String {
        return String(format: "%.\(f)f", self)
    }
}
