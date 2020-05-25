//
//  StatRowView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class StatRowView: UIView {
    
    enum Mode {
        case roi, profit, passing, coefficient
    }
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 14)
        return view
    }()
    
    private let spacerLine: UIView = {
        let view = UIView()
        view.backgroundColor = .clear
        
        let line = UIView()
        line.backgroundColor = .lineGray
        view.addSubview(line)
        line.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-5)
            make.height.equalTo(1)
        }
        
        return view
    }()
    
    private let valueLabel: PositivityLabel = {
        let view = PositivityLabel()
        view.font = .robotoMedium(size: 16)
        return view
    }()
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(mode: Mode, value: Double) {
        setMode(mode)
        
        if mode == .coefficient {
            valueLabel.textColor = .titleBlack
            valueLabel.text = String(format: "%.2f", value)
        } else {
            valueLabel.setNumber(to: value)
        }
    }
    
    private func setMode(_ mode: Mode) {
        switch mode {
        case .roi:
            titleLabel.text = Text.profileStatsROI
            
            valueLabel.units = .percent
            valueLabel.rounding = .decimal(1)
            valueLabel.showingSign = false
        case .profit:
            titleLabel.text = Text.profileStatsNetProfit
            
            valueLabel.units = .none
            valueLabel.rounding = .integer
            valueLabel.showingSign = false
            
        case .passing:
            titleLabel.text = Text.profileStatsPassing
            
            valueLabel.units = .percent
            valueLabel.rounding = .integer
            valueLabel.showingSign = false
            
        case .coefficient:
            titleLabel.text = Text.profileStatsCoefficient
            
            //treat label as default label
        }
    }
    
    private func makeLayout() {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.spacing = 5
        stack.isSkeletonable = true
        
        addSubview(stack)
        stack.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        titleLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        valueLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        
        stack.addArrangedSubview(titleLabel)
        
        stack.addArrangedSubview(spacerLine)
        spacerLine.snp.makeConstraints { (make) in
            make.width.equalToSuperview().priority(.high)
        }
        
        stack.addArrangedSubview(valueLabel)
    }
}
