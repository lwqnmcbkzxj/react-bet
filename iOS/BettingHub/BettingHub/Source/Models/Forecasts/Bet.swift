//
//  Bet.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Bet: Decodable {
    
    let value: Double
    let coefficient: Double
    let type: String
    let pureProfit: Double
    let status: Status
    
    
    init(value: Double, coefficient: Double, type: String, pureProfit: Double, status: Status) {
        self.value = value
        self.coefficient = coefficient
        self.type = type
        self.pureProfit = pureProfit
        self.status = status
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        value = try container.decode(Double.self, forKey: .value)
        coefficient = try container.decode(Double.self, forKey: .coefficient)
        type = try container.decode(String.self, forKey: .type)
        pureProfit = try container.decode(Double.self, forKey: .pureProfit)
        status = try container.decode(Status.self, forKey: .status)
    }
    
    static func stub() -> Bet {
        .init(value: 100,
              coefficient: 2,
              type: "TestBetType",
              pureProfit: 1,
              status: .win)
    }
    
    private enum CodingKeys: String, CodingKey {
        case value = "bet"
        case coefficient = "coefficient"
        case type = "type"
        case pureProfit = "pure_profit"
        case status = "status"
    }
}

extension Bet {
    enum Status: Int, Decodable {
        case returned
        case wait
        case win
        case lose
    }
}
