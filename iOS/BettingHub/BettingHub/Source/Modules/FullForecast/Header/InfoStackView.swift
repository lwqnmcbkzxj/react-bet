//
//  InfoStackView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class InfoStackView: UIView {
    
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
    
    func populateStack(labels: [(leftLabel: UILabel, rightLabel: UILabel)]) {
        stackView.arrangedSubviews.forEach { $0.removeFromSuperview() }
        
        for (offset, labelsPair) in labels.enumerated() {
            let row = self.row(leftLabel: labelsPair.leftLabel,
                               rightLabel: labelsPair.rightLabel,
                               withLine: offset != labels.count - 1)
            stackView.addArrangedSubview(row)
        }
    }

    private func row(leftLabel: UILabel, rightLabel: UILabel, withLine: Bool = true) -> UIView {
        let row = UIView()
        
        leftLabel.textAlignment = .left
        row.addSubview(leftLabel)
        leftLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        leftLabel.snp.makeConstraints { (make) in
            make.leading.top.equalToSuperview()
            make.bottom.equalToSuperview().offset(-2)
        }
        
        rightLabel.textAlignment = .right
        row.addSubview(rightLabel)
        
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
}
