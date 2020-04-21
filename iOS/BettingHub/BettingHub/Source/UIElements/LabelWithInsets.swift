//
//  LabelWithInsets.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class LabelWithInsets: UILabel {
    
    var insets: UIEdgeInsets = .zero
    
    override func drawText(in rect: CGRect) {
        super.drawText(in: rect.inset(by: insets))
    }
    
    override var intrinsicContentSize: CGSize {
        return .init(width: super.intrinsicContentSize.width + insets.left + insets.right,
                     height: super.intrinsicContentSize.height + insets.top + insets.bottom)
    }
}
