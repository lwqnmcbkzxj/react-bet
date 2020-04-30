//
//  RatingArrow.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class RatingArrow: UIView {
    
    var isUp: Bool = true {
        didSet { setNeedsDisplay() }
    }
    
    override func draw(_ rect: CGRect) {
        let path = UIBezierPath()
        
        if isUp {
            path.move(to: .init(x: rect.width / 2, y: 0))
            path.addLine(to: .init(x: rect.width, y: rect.height / 2))
            path.addLine(to: .init(x: 0, y: rect.height / 2))
            path.close()
            
            
            let layer = CAShapeLayer()
            layer.fillColor = UIColor.positiveGreen.cgColor
            layer.strokeColor = UIColor.clear.cgColor
            layer.path = path.cgPath
            self.layer.addSublayer(layer)
        } else {
            path.move(to: .init(x: rect.width / 2, y: rect.height))
            path.addLine(to: .init(x: rect.width, y: rect.height / 2))
            path.addLine(to: .init(x: 0, y: rect.height / 2))
            path.close()
            
            
            let layer = CAShapeLayer()
            layer.fillColor = UIColor.negativeRed.cgColor
            layer.strokeColor = UIColor.clear.cgColor
            layer.path = path.cgPath
            self.layer.addSublayer(layer)
        }
    }
}
