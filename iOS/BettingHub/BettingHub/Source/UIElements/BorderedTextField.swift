//
//  BorderedTextField.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BorderedTextField: UITextField {
    
    private let leftInset: CGFloat = 10
    private let rightInset: CGFloat = 10
    private let spaceToRightView: CGFloat = 5
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        layer.borderColor = UIColor.lineGray.cgColor
        layer.borderWidth = 1
        layer.cornerRadius = 6
        font = .robotoRegular(size: 19)
        textColor = .titleBlack
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return editingRect(forBounds: bounds)
    }

    override func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return editingRect(forBounds: bounds)
    }

    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        let def = super.editingRect(forBounds: bounds)
        return def.inset(by: .init(top: 0,
                                   left: leftInset,
                                   bottom: 0,
                                   right: spaceToRightView))
    }
    
    override func rightViewRect(forBounds bounds: CGRect) -> CGRect {
        let height: CGFloat = 22
        let width: CGFloat = 22
        let x: CGFloat = bounds.maxX - width - rightInset
        let y: CGFloat = (bounds.height - height) / 2
        return .init(x: x, y: y, width: width, height: height)
    }
}
