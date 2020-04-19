//
//  UIItems.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class UIItems {
    
    static var authTextButton: UIButton {
        let button = UIButton()
        button.titleLabel?.font = .robotoRegular(size: 16)
        button.backgroundColor = .white
        button.setTitleColor(.mainOrange, for: .normal)
        button.setTitleColor(.textGray, for: .highlighted)
        return button
    }
    
    static var forecastTitleLabel: UILabel {
        let label = UILabel()
        label.text = "title"
        label.textColor = .titleBlack
        label.font = .robotoRegular(size: 14)
        return label
    }
    
    static var forecastValueLabel: UILabel {
        let label = UILabel()
        label.text = "value"
        label.textColor = .titleBlack
        label.font = .robotoMedium(size: 14)
        label.backgroundColor = .forecastLabelBackground
        label.layer.cornerRadius = 4
        return label
    }
}
