//
//  PositivityLabel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class PositivityLabel: UILabel {
    
    enum Units {
        case percent, none, rubles
    }
    
    enum Rounding {
        case decimal(Int)
        case integer
    }
    
    var number: Double {
        return Double(text ?? "0") ?? 0
    }
    
    var showingSign: Bool = true
    
    var units: Units = .percent
    
    var rounding: Rounding = .decimal(1)
    
    var dividingValue: Double = 0
    
    init() {
        super.init(frame: .zero)
        setNumber(to: 0)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setNumber(to number: Double) {
        if number == dividingValue {
            textColor = .titleBlack
        } else if number > dividingValue {
            textColor = .positiveGreen
        } else {
            textColor = .negativeRed
        }
        
        let numberStr = getNumberStr(from: number)
        let unitsStr = getUnitsStr()
        let sign = number > 0 ? "+" : ""
        text = "\(showingSign ? sign : "")\(numberStr)\(unitsStr)"
    }
    
    private func getNumberStr(from number: Double) -> String {
        switch rounding {
        case .decimal(let places):
            return String(format: "%.\(places)f", number)
            
        case .integer:
            return String(Int(number))
        }
    }
    
    private func getUnitsStr() -> String {
        switch units {
        case .percent:
            return "%"
        case .rubles:
            return "₽"
        default:
            return ""
        }
    }
}
