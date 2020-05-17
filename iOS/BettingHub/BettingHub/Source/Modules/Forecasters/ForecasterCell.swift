
//
//  ForecasterCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecasterCell: UITableViewCell {
    
    private let arrowView = RatingArrow()
    
    private let positionLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.text = "0"
        return view
    }()
    
    private let userImageView: UIImageView = {
        let view = UIImageView()
        view.layer.masksToBounds = true
        view.layer.cornerRadius = 5
        view.isSkeletonable = true
        view.makeBordered()
        return view
    }()
    
    private let userLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.isSkeletonable = true
        view.text = "Nickname"
        return view
    }()
    
    private let statsLabel: StatsLabel = {
        let view = StatsLabel()
        view.isSkeletonable = true
        view.text = "asfaf"
        return view
    }()
    
    private let incomeLabel: PositivityLabel = {
        let view = PositivityLabel()
        view.rounding = .decimal(1)
        view.showingSign = true
        view.units = .percent
        view.isSkeletonable = true
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        backgroundColor = .white
        layer.borderWidth = 1
        layer.borderColor = UIColor.lineGray.cgColor
        isSkeletonable = true
        selectionStyle = .none
        
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with forecaster: Forecaster) {
        userImageView.setImage(url: forecaster.avatar)
        userLabel.text = forecaster.login
        statsLabel.set(wins: forecaster.stats.wins,
                       loses: forecaster.stats.loss,
                       draws: forecaster.stats.back)
        
        let income = round(forecaster.stats.roi * 100)
        incomeLabel.setNumber(to: income)
    }
    
    private func makeLayout() {
        
        let leftStack = UIStackView()
        leftStack.axis = .horizontal
        leftStack.spacing = 6
        leftStack.isSkeletonable = true
        
        contentView.addSubview(leftStack)
        leftStack.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.equalToSuperview().offset(8)
            make.height.equalTo(18)
        }
        
        leftStack.addArrangedSubview(arrowView)
        arrowView.snp.makeConstraints { (make) in
            make.width.equalTo(10)
        }
        
        leftStack.addArrangedSubview(positionLabel)
        
        let imageGuide = UILayoutGuide()
        addLayoutGuide(imageGuide)
        imageGuide.snp.makeConstraints { (make) in
            make.width.equalToSuperview().multipliedBy(5.0/6)
            make.top.bottom.trailing.equalToSuperview()
            make.leading.greaterThanOrEqualTo(leftStack.snp.trailing)
        }
        
        contentView.addSubview(userImageView)
        userImageView.snp.makeConstraints { (make) in
            make.leading.equalTo(imageGuide)
            make.width.height.equalTo(30)
            make.centerY.equalToSuperview()
        }
        
        contentView.addSubview(userLabel)
        userLabel.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.equalTo(userImageView.snp.trailing).offset(6)
        }
        
        let statsGuide = UILayoutGuide()
        addLayoutGuide(statsGuide)
        statsGuide.snp.makeConstraints { (make) in
            make.width.equalToSuperview().multipliedBy(2.0/5)
            make.top.bottom.trailing.equalToSuperview()
        }
        
        contentView.addSubview(statsLabel)
        statsLabel.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.equalTo(statsGuide)
            make.height.equalTo(20)
        }
        
        let incomeGuide = UILayoutGuide()
        addLayoutGuide(incomeGuide)
        incomeGuide.snp.makeConstraints { (make) in
            make.width.equalToSuperview().multipliedBy(1.0/5)
            make.top.bottom.trailing.equalToSuperview()
        }
        
        contentView.addSubview(incomeLabel)
        incomeLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        incomeLabel.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
//            make.centerX.equalTo(incomeGuide)
            make.trailing.lessThanOrEqualToSuperview().offset(-4)
        }
    }
}
