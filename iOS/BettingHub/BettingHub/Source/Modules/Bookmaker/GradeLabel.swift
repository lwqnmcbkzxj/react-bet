//
//  GradeLabel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class GradeLabel: UILabel {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        font = .robotoMedium(size: 14)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setGrade(_ grade: Double, of max: Double) {
        let gradeStr = String(format: "%.2f", grade)
        let separator = "/"
        let maxStr = String(Int(max))
        let attrStr = NSMutableAttributedString(string: gradeStr + separator + maxStr)
        attrStr.addAttribute(.foregroundColor,
                             value: UIColor.positiveGreen,
                             range: .init(location: 0,
                                          length: gradeStr.count))
        
        attributedText = attrStr
    }
}
