//
//  StatsLabel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class StatsLabel: UILabel {
    
    func set(wins: Int, loses: Int, draws: Int) {
        let str = NSMutableAttributedString(string: "")
        
        str.append(createPart(color: .positiveGreen, value: wins))
        addSeparator(str)
        str.append(createPart(color: .negativeRed, value: loses))
        addSeparator(str)
        str.append(createPart(color: .drawBlue, value: draws))
        
        attributedText = str
    }
    
    private func createPart(color: UIColor, value: Int) -> NSMutableAttributedString {
        let str = NSMutableAttributedString(string: "\(value)")
        str.addAttribute(.foregroundColor,
                         value: color,
                         range: .init(location: 0, length: str.length))
        return str
    }
    
    private func addSeparator(_ str: NSMutableAttributedString) {
        let sep = NSMutableAttributedString(string: "/")
        sep.addAttribute(.foregroundColor,
                         value: UIColor.titleBlack,
                         range: .init(location: 0, length: 1))
        str.append(sep)
    }
}
