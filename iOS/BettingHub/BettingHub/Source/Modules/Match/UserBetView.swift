//
//  UserBetView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class UserBetView: UIView {
    
    private let imageView: UIImageView = {
        let view = UIImageView()
        view.makeBordered()
        view.layer.cornerRadius = 5
        return view
    }()
    
    private let usernameLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.text = "Username"
        return view
    }()
    
    private let betLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.text = "П2"
        view.textAlignment = .center
        return view
    }()
    
    private let passabilityLabel: PositivityLabel = {
        let label = PositivityLabel()
        label.showingSign = false
        label.units = .percent
        label.rounding = .integer
        label.dividingValue = 50
        label.setNumber(to: 49)
        label.textAlignment = .center
        return label
    }()
    
    private let separatorLine: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(8)
            make.top.equalToSuperview().offset(11)
            make.width.height.equalTo(30)
        }
        
        addSubview(usernameLabel)
        usernameLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(imageView.snp.trailing).offset(7)
            make.centerY.equalToSuperview()
        }
        
        let passabilityGuide = UILayoutGuide()
        addLayoutGuide(passabilityGuide)
        passabilityGuide.snp.makeConstraints { (make) in
            make.top.bottom.trailing.equalTo(self)
            make.width.equalTo(self).multipliedBy(0.3)
        }
        
        let betGuide = UILayoutGuide()
        addLayoutGuide(betGuide)
        betGuide.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(self)
            make.trailing.equalTo(passabilityGuide.snp.leading)
            make.width.equalTo(self).multipliedBy(0.2)
            make.leading.greaterThanOrEqualTo(usernameLabel)
        }
        
        addSubview(betLabel)
        betLabel.snp.contentCompressionResistanceHorizontalPriority = 999
        betLabel.snp.makeConstraints { (make) in
            make.trailing.equalTo(betGuide)
            make.centerY.equalToSuperview()
            make.leading.equalTo(betGuide).priority(.medium)
        }
        
        addSubview(passabilityLabel)
        passabilityLabel.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.trailing.equalTo(passabilityGuide)
        }
        
        addSubview(separatorLine)
        separatorLine.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.height.equalTo(1)
        }
    }
}
