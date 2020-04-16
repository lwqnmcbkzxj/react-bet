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
}
