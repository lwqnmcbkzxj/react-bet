//
//  ForecastInfoStackView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastInfoStackView: UIView {
    
    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.distribution = .fillEqually
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        
        addSubview(stackView)
        stackView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(forecast: Forecast) {
        populateStack()
    }
    
    private func populateStack() {
        stackView.arrangedSubviews.forEach { $0.removeFromSuperview() }
        stackView.addArrangedSubview(plainRow(title: Text.tournament, value: "NORCECA WCC"))
        stackView.addArrangedSubview(plainRow(title: Text.dateTime, value: "10.04.2020 в 12:40"))
        stackView.addArrangedSubview(boldRow(title: Text.forecastWord, value: "Тотал больше 1.5"))
        stackView.addArrangedSubview(plainRow(title: Text.coeficientWord, value: "1.78"))
        stackView.addArrangedSubview(positivityRow(title: Text.bet, value: 1700))
        stackView.addArrangedSubview(positivityRow(title: Text.possibleWin, value: 1370, withLine: false))
    }
    
    
    private func plainRow(title: String, value: String, withLine: Bool = true) -> UIView {
        let titleLabel = label(text: title, weight: .regular)
        let valueLabel = label(text: value, weight: .regular)
        return row(leftLabel: titleLabel, rightLabel: valueLabel, withLine: withLine)
    }
    
    private func boldRow(title: String, value: String, withLine: Bool = true) -> UIView {
        let titleLabel = label(text: title, weight: .regular)
        let valueLabel = label(text: value, weight: .bold)
        return row(leftLabel: titleLabel, rightLabel: valueLabel, withLine: withLine)
    }
    
    private func positivityRow(title: String, value: Double, withLine: Bool = true) -> UIView {
        let titleLabel = label(text: title, weight: .regular)
        let valueLabel = positivityLabel(value: value)
        valueLabel.font = .robotoMedium(size: 14)
        return row(leftLabel: titleLabel, rightLabel: valueLabel, withLine: withLine)
    }
    
    private func row(leftLabel: UILabel, rightLabel: UILabel, withLine: Bool = true) -> UIView {
        let row = UIView()
        
        leftLabel.textAlignment = .left
        row.addSubview(leftLabel)
        leftLabel.snp.makeConstraints { (make) in
            make.leading.top.equalToSuperview()
            make.bottom.equalToSuperview().offset(-2)
        }
        
        rightLabel.textAlignment = .right
        row.addSubview(rightLabel)
        rightLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        rightLabel.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview()
            make.top.bottom.equalTo(leftLabel)
            make.leading.greaterThanOrEqualTo(leftLabel.snp.trailing).offset(10)
        }
        
        if withLine {
            let line = UIView()
            line.backgroundColor = .lineGray
            row.addSubview(line)
            line.snp.makeConstraints { (make) in
                make.leading.bottom.trailing.equalToSuperview()
                make.height.equalTo(1)
            }
        }
        
        return row
    }
    
    private func label(text: String, weight: UIFont.Weight) -> UILabel {
        let label = UILabel()
        label.textColor = .titleBlack
        label.font = weight == .bold ? .robotoBold(size: 14) : .robotoRegular(size: 14)
        label.text = text
        return label
    }
    
    private func positivityLabel(value: Double) -> UILabel {
        let label = PositivityLabel()
        label.showingSign = false
        label.units = .rubles
        label.rounding = .integer
        label.setNumber(to: value)
        return label
    }
}
