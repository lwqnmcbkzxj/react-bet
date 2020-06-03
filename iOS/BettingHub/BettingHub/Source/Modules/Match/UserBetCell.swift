//
//  UserBetView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class UserBetCell: UITableViewCell {
    
    private let userImageView: UIImageView = {
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
    
    private let whiteView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        makeLayout()
        contentView.backgroundColor = .lineGray
        contentView.clipsToBounds = true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with forecast: Match.Forecast) {
        let stats = forecast.user.stats
        let total = stats.loss + stats.wins + stats.back
        let passing = total != 0 ? (stats.wins * 100)/total : 0
        
        userImageView.setImage(url: forecast.user.avatar)
        usernameLabel.text = forecast.user.login
        betLabel.text = forecast.bet.type
        passabilityLabel.setNumber(to: Double(passing)) 
    }
    
    private func makeLayout() {
        contentView.addSubview(whiteView)
        whiteView.snp.makeConstraints { (make) in
            make.top.equalToSuperview()
            make.leading.equalToSuperview().offset(1)
            make.trailing.bottom.equalToSuperview().offset(-1)
        }
        
        contentView.addSubview(userImageView)
        userImageView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(8)
            make.top.equalToSuperview().offset(11)
            make.width.height.equalTo(30)
            make.bottom.equalToSuperview().offset(-14)
        }
        
        contentView.addSubview(usernameLabel)
        usernameLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(userImageView.snp.trailing).offset(7)
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
        
        contentView.addSubview(betLabel)
        betLabel.snp.contentCompressionResistanceHorizontalPriority = 999
        betLabel.snp.makeConstraints { (make) in
            make.trailing.equalTo(betGuide)
            make.centerY.equalToSuperview()
            make.leading.equalTo(betGuide).priority(.medium)
        }
        
        contentView.addSubview(passabilityLabel)
        passabilityLabel.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.trailing.equalTo(passabilityGuide)
        }
    }
}
