//
//  BetStatusView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BetStatusView: UIView {
    
    private let grayColor = UIColor.lightGray
    private let greenColor = UIColor.positiveGreen
    private let blueColor = UIColor.drawBlue
    
    private let label: UILabel = {
        let view = UILabel()
        view.textColor = .white
        view.font = .robotoMedium(size: 14)
        view.snp.contentCompressionResistanceHorizontalPriority = 1000
        view.snp.contentHuggingHorizontalPriority = 1000
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        layer.borderWidth = 2
        layer.borderColor = UIColor.clear.cgColor
        layer.cornerRadius = 5
        
        backgroundColor = grayColor
        label.text = ""
        
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override var intrinsicContentSize: CGSize {
        CGSize(width: label.intrinsicContentSize.width + 12,
               height: label.intrinsicContentSize.height)
    }
    
    func configure(with bet: Bet) {
        let xb = " xB"
        let profit = bet.value * bet.pureProfit
        switch bet.status {
        case .returned:
            backgroundColor = grayColor
            layer.borderColor = blueColor.cgColor
            label.textColor = .titleBlack
            label.text = bet.value.description(f: 2) + xb
        case .wait:
            backgroundColor = grayColor
            backgroundColor = .clear
            layer.borderColor = UIColor.clear.cgColor
            label.textColor = .clear
            label.text = ""
        case .win:
            backgroundColor = greenColor
            layer.borderColor = UIColor.clear.cgColor
            label.textColor = .white
            label.text = profit.description(f: 2) + xb
        case .lose:
            backgroundColor = grayColor
            layer.borderColor = UIColor.clear.cgColor
            label.textColor = .titleBlack
            label.text = "- " + bet.value.description(f: 2) + xb
        }
    }
    
    private func makeLayout() {
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(8)
            make.trailing.equalToSuperview().offset(-4)
            make.width.equalTo(0).priority(900)
        }
    }
}
