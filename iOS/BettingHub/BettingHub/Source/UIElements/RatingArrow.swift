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
    
    var isVisible: Bool = true {
        didSet { setNeedsDisplay() }
    }
    
    override func draw(_ rect: CGRect) {
        self.layer.sublayers?.forEach { $0.removeFromSuperlayer() }
        if !isVisible { return }
        
        let path = UIBezierPath()
        
        let topY = rect.height * 0.25
        let botY = rect.height * 0.75
        if isUp {
            path.move(to: .init(x: rect.width / 2, y: topY))
            path.addLine(to: .init(x: rect.width, y: botY))
            path.addLine(to: .init(x: 0, y: botY))
            path.close()
            
            
            let layer = CAShapeLayer()
            layer.fillColor = UIColor.positiveGreen.cgColor
            layer.strokeColor = UIColor.clear.cgColor
            layer.path = path.cgPath
            self.layer.addSublayer(layer)
        } else {
            path.move(to: .init(x: rect.width / 2, y: botY))
            path.addLine(to: .init(x: rect.width, y: topY))
            path.addLine(to: .init(x: 0, y: topY))
            path.close()
            
            
            let layer = CAShapeLayer()
            layer.fillColor = UIColor.negativeRed.cgColor
            layer.strokeColor = UIColor.clear.cgColor
            layer.path = path.cgPath
            self.layer.addSublayer(layer)
        }
    }
}
