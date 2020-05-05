//
//  BottomButton.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BottomButton: UIButton {
    
    private let isWhiteStyle: Bool
    private let backgroundColorNormal: UIColor
    private let backgroundColorSelected: UIColor
    
    init(whiteStyle: Bool = false) {
        isWhiteStyle = whiteStyle
        let titleColorNormal = UIColor.bottomButtonText
        let titleColorSelected = whiteStyle ? UIColor.bottomButtonText : UIColor.white
        backgroundColorNormal = whiteStyle ? UIColor.white : UIColor.bottomButtonBackgroundGray
        backgroundColorSelected = whiteStyle ? UIColor.bottomButtonBackgroundGray : UIColor.mainOrange
        
        super.init(frame: .zero)
        
        setTitleColor(titleColorNormal, for: .normal)
        setTitleColor(titleColorSelected, for: .highlighted)
        backgroundColor = backgroundColorNormal
        titleLabel?.font = UIFont.robotoMedium(size: 18)
        layer.cornerRadius = 6
        if whiteStyle {
            layer.borderColor = UIColor.lineGray.cgColor
            layer.borderWidth = 1
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override var isHighlighted: Bool {
        didSet {
            if isHighlighted {
                backgroundColor = backgroundColorSelected
            } else {
                backgroundColor = backgroundColorNormal
            }
        }
    }
}
