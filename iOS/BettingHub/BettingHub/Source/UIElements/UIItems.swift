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
        button.setTitle("title", for: .normal)
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
        let label = LabelWithInsets()
        label.insets = .init(top: 0, left: 6, bottom: 0, right: 6)
        label.text = "value"
        label.textColor = .titleBlack
        label.font = .robotoMedium(size: 14)
        label.backgroundColor = .forecastLabelBackground
        label.layer.cornerRadius = 4
        label.layer.masksToBounds = true
        return label
    }
    
    static var grayPanel: UIView {
        let view = UIView()
        view.backgroundColor = .hex(0xF9F9F9)
        view.layer.cornerRadius = 7
        view.layer.shadowOpacity = 0.1
        view.layer.shadowOffset = .zero
        view.layer.shadowRadius = 5
        return view
    }
    
    static var settingsSectionLabel: UILabel {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 18)
        return view 
    }
}
