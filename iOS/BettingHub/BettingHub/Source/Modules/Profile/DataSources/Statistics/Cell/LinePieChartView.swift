//
//  LinePieChartView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class LinePieChartView: UIView {
    
    struct Part {
        let value: Double
        let color: UIColor
    }
    
    private(set) var parts: [Part] = []
    
    var titleText: String = "" {
        didSet { titleLabel.text = titleText }
    }
    
    func configure(with parts: [Part]) {
        self.parts = parts
        
        let sum = parts.reduce(0) { $0 + $1.value }
        self.valueLabel.text = "\(Int(sum))"
        
        setNeedsDisplay()
    }
    
    private let valueLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 30)
        view.minimumScaleFactor = 0.5
        view.text = "100"
        return view
    }()
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.text = "Title"
        return view
    }()
    
    
    private var chartLayer: CALayer?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .clear
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func draw(_ rect: CGRect) {
        chartLayer?.removeFromSuperlayer()
        
        
        let newChartLayer = getArcs()
                            .map { arcLayer(from: $0.start, to: $0.end, color: $0.color) }
                            .reduce(into: CAShapeLayer()) { $0.addSublayer($1) }
        
        self.chartLayer = newChartLayer
        layer.insertSublayer(newChartLayer, at: 0)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        setNeedsDisplay()
    }
    
    private func getArcs() -> [(start: CGFloat, end: CGFloat, color: UIColor)] {
        let sum = parts.reduce(0) { $0 + $1.value }
        
        let fullCircle = CGFloat.pi * 2
        let space = CGFloat.pi / 30
        let spacesCount = CGFloat(parts.count)
        
        let linedCircle = fullCircle - space * spacesCount
        
        var currentAngle: CGFloat = -CGFloat.pi/2
        
        let arcs = parts.map { (part) -> (CGFloat, CGFloat, UIColor) in
            let start = currentAngle
            let length = linedCircle * CGFloat(part.value / sum)
            let arc = (start, start + length, part.color)
            currentAngle += length + space
            return arc
        }
        
        return arcs
    }
    
    private func arcLayer(from start: CGFloat, to end: CGFloat, color: UIColor) -> CAShapeLayer {
        
        let arcLayer = CAShapeLayer()
        arcLayer.fillColor = UIColor.clear.cgColor
        arcLayer.lineCap = .round
        arcLayer.strokeColor = color.cgColor
        arcLayer.lineWidth = 2.5
        
        let centerX = bounds.minX + (bounds.maxX - bounds.minX) / 2
        let centerY = bounds.minY + (bounds.maxY - bounds.minY) / 2
        let center = CGPoint(x: centerX, y: centerY)
        let bezier = UIBezierPath(arcCenter: center,
                                  radius: bounds.width / 2,
                                  startAngle: start,
                                  endAngle: end,
                                  clockwise: true)
        
        arcLayer.path = bezier.cgPath
        
        return arcLayer
    }
    
    private func makeLayout() {
        addSubview(valueLabel)
        valueLabel.snp.makeConstraints { (make) in
            make.bottom.equalTo(snp.centerY)
            make.centerX.equalToSuperview()
            make.leading.greaterThanOrEqualToSuperview()
            make.trailing.lessThanOrEqualToSuperview()
        }
        
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.top.equalTo(valueLabel.snp.bottom)
            make.centerX.equalToSuperview()
            make.leading.greaterThanOrEqualToSuperview()
            make.trailing.lessThanOrEqualToSuperview()
        }
    }
}
