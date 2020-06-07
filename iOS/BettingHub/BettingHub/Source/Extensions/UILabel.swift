//
//  UILabel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UILabel {
    
    func setHtmlText(_ str: String) {
        guard let attrString = str.html2AttributedString else { return }
        let mutable = NSMutableAttributedString(attributedString: attrString)
        let fullRange = NSRange(location: 0, length: mutable.length)
        mutable.addAttributes([.font: self.font], range: fullRange)
        attributedText = mutable
    }
}
