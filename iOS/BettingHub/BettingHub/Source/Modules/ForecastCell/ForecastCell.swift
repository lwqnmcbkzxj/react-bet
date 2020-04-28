//
//  ForecastCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastCell: UITableViewCell {
    
    private let panelView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 7
        return view
    }()
    
    private let cornerIcon: UIImageView = {
        let view = UIImageView()
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.borderWidth = 1
        view.isSkeletonable = true
        return view
    }()
    
    private let sportLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 11)
        view.isSkeletonable = true
        return view
    }()
    
    private let seasonLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 11)
        view.isSkeletonable = true
        view.textAlignment = .right
        return view
    }()
    
    private let topSeparator: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    private let matchLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 18)
        view.isSkeletonable = true
        return view
    }()
    
    private let forecastTitleLabel: UILabel = {
        let view = UIItems.forecastTitleLabel
        view.text = Text.forecast
        view.isSkeletonable = true
        return view
    }()
    
    private let betAmountTitleLabel: UILabel = {
        let view = UIItems.forecastTitleLabel
        view.text = Text.betAmount
        view.isSkeletonable = true
        return view
    }()
    
    private let matchStartTitleLabel: UILabel = {
        let view = UIItems.forecastTitleLabel
        view.text = Text.matchStart
        view.isSkeletonable = true
        return view
    }()
    
    private let coeficientTitleLabel: UILabel = {
        let view = UIItems.forecastTitleLabel
        view.text = Text.coeficient
        view.isSkeletonable = true
        return view
    }()
    
    private let forecastLabel: UILabel = {
        let view = UIItems.forecastValueLabel
        view.isSkeletonable = true
        return view
    }()
    
    private let betAmountLabel: UILabel = {
        let view = UIItems.forecastValueLabel
        view.isSkeletonable = true
        return view
    }()
    
    private let matchStartLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGrayDark
        view.font = .robotoItalic(size: 14)
        view.isSkeletonable = true
        return view
    }()
    
    private let coeficientLabel: UILabel = {
        let view = UIItems.forecastValueLabel
        view.isSkeletonable = true
        return view
    }()
    
    private let descLabel: UILabel = {
        let view = UILabel()
        view.numberOfLines = 6
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.isSkeletonable = true
        return view
    }()
    
    private let userImageView: UIImageView = {
        let view = UIImageView()
        view.layer.cornerRadius = 2
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        return view
    }()
    
    private let usernameLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 14)
        return view
    }()
    
    private let lastForecastsView: LastForecastsView = {
        let view = LastForecastsView()
        view.populate(with: [false, false, false, false, false])
        return view
    }()
    
    private let incomeTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 14)
        view.text = Text.income
        return view
    }()
    
    private let incomeLabel: PositivityLabel = {
        let view = PositivityLabel()
        view.units = .percent
        view.rounding = .decimal(1)
        view.showingSign = true
        view.text = ""
        return view
    }()
    
    private let bottomSeparator: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    private let commentsView: LabeledIconWithNumber = {
        let view = LabeledIconWithNumber()
        let image = UIImage(named: "commentIcon")!
        view.setImage(image)
        view.isSkeletonable = true
        return view
    }()
    
    private let bookmarksView: LabeledIconWithNumber = {
        let view = LabeledIconWithNumber()
        let image = UIImage(named: "bookmarkIcon")!
        view.setImage(image)
        view.isSkeletonable = true
        return view
    }()
    
    private let stepperView: ArrowsStepperView = {
        let view = ArrowsStepperView()
        view.isSkeletonable = true
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        selectionStyle = .none
        makeLayout()
        isSkeletonable = true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with forecast: Forecast) {
        sportLabel.text = forecast.sportName
        seasonLabel.text = forecast.tournament
        matchLabel.text = forecast.text
        descLabel.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio"
        forecastLabel.text = "ФОРА1 (-1.5)"
        coeficientLabel.text = String(forecast.coefficient)
        betAmountLabel.text = String(forecast.betValue)
        matchStartLabel.text = forecast.time
        usernameLabel.text = forecast.userName
        userImageView.setImage(url: forecast.userAvatar)
        lastForecastsView.populate(with: [true, false, true, true, false])
        incomeLabel.setNumber(to: 50.4)
        commentsView.setNumber(forecast.commentsQuanity)
        bookmarksView.setNumber(forecast.favAmmount)
        stepperView.setNumber(forecast.rating)
    }
    
    private func makeLayout() {
        
        contentView.addSubview(panelView)
        panelView.snp.makeConstraints { (make) in
            make.leading.trailing.top.equalToSuperview()
            make.height.equalTo(402)
        }
        
        contentView.addSubview(cornerIcon)
        cornerIcon.snp.makeConstraints { (make) in
            make.width.height.equalTo(15)
            make.leading.equalTo(panelView).offset(8)
            make.top.equalToSuperview().offset(11)
        }
        
        contentView.addSubview(sportLabel)
        sportLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        sportLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(cornerIcon)
            make.leading.equalTo(cornerIcon.snp.trailing).offset(5)
        }
        
        contentView.addSubview(seasonLabel)
        seasonLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(cornerIcon)
            make.leading.equalTo(sportLabel.snp.trailing).offset(3)
            make.trailing.equalTo(panelView).offset(-8)
        }
        
        contentView.addSubview(topSeparator)
        topSeparator.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(cornerIcon.snp.bottom).offset(8)
            make.height.equalTo(1)
        }
        
        contentView.addSubview(matchLabel)
        matchLabel.snp.makeConstraints { (make) in
            make.top.equalTo(topSeparator).offset(13)
            make.leading.equalTo(panelView).offset(8)
            make.trailing.equalTo(panelView).offset(-8)
            make.height.equalTo(24)
        }
        
        contentView.addSubview(forecastTitleLabel)
        forecastTitleLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        forecastTitleLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(panelView).offset(8)
            make.top.equalTo(matchLabel.snp.bottom).offset(12)
            make.height.equalTo(19)
        }
        
        contentView.addSubview(forecastLabel)
        forecastLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(forecastTitleLabel.snp.trailing).offset(3)
            make.top.equalTo(forecastTitleLabel).offset(-1)
            make.bottom.equalTo(forecastTitleLabel).offset(2)
        }
        
        contentView.addSubview(coeficientTitleLabel)
        coeficientTitleLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        coeficientTitleLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(forecastLabel.snp.trailing).offset(18).priority(.high)
            make.leading.greaterThanOrEqualTo(forecastLabel.snp.trailing).offset(5)
            make.top.bottom.equalTo(forecastTitleLabel)
        }
        
        contentView.addSubview(coeficientLabel)
        coeficientLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(forecastLabel)
            make.leading.equalTo(coeficientTitleLabel.snp.trailing).offset(3)
            make.trailing.lessThanOrEqualTo(panelView).offset(-8)
        }
        
        contentView.addSubview(betAmountTitleLabel)
        betAmountTitleLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        betAmountTitleLabel.snp.makeConstraints { (make) in
            make.leading.height.equalTo(forecastTitleLabel)
            make.top.equalTo(forecastTitleLabel.snp.bottom).offset(9)
        }
        
        contentView.addSubview(betAmountLabel)
        betAmountLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(betAmountTitleLabel.snp.trailing).offset(3)
            make.top.equalTo(betAmountTitleLabel).offset(-1)
            make.bottom.equalTo(betAmountTitleLabel).offset(2)
            make.trailing.lessThanOrEqualTo(panelView).offset(-8)
        }
        
        contentView.addSubview(matchStartTitleLabel)
        matchStartTitleLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        matchStartTitleLabel.snp.makeConstraints { (make) in
            make.leading.height.equalTo(betAmountTitleLabel)
            make.top.equalTo(betAmountTitleLabel.snp.bottom).offset(9)
        }
        
        contentView.addSubview(matchStartLabel)
        matchStartLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(matchStartTitleLabel.snp.trailing).offset(9)
            make.top.bottom.equalTo(matchStartTitleLabel)
            make.trailing.lessThanOrEqualTo(panelView).offset(-8)
        }
        
        contentView.addSubview(descLabel)
        descLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(panelView).offset(9)
            make.trailing.equalTo(panelView).offset(-9)
            make.top.equalTo(matchStartTitleLabel.snp.bottom).offset(20)
            make.height.equalTo(132)
        }
        
        let userLine = buildUserLine()
        contentView.addSubview(userLine)
        userLine.snp.makeConstraints { (make) in
            make.leading.equalTo(panelView).offset(8)
            make.trailing.lessThanOrEqualTo(panelView).offset(-8)
            make.top.equalTo(descLabel.snp.bottom).offset(17)
            make.height.equalTo(25)
        }
        
        contentView.addSubview(bottomSeparator)
        bottomSeparator.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(panelView)
            make.top.equalTo(userLine.snp.bottom).offset(17)
            make.height.equalTo(1)
        }
        
        contentView.addSubview(commentsView)
        commentsView.snp.makeConstraints { (make) in
            make.top.equalTo(bottomSeparator).offset(11)
            make.leading.equalTo(panelView).offset(11)
            make.height.equalTo(16)
        }
        
        contentView.addSubview(bookmarksView)
        bookmarksView.snp.makeConstraints { (make) in
            make.leading.equalTo(commentsView.snp.trailing).offset(16)
            make.height.top.bottom.equalTo(commentsView)
        }
        
        contentView.addSubview(stepperView)
        stepperView.snp.makeConstraints { (make) in
            make.top.equalTo(bottomSeparator).offset(8)
            make.trailing.equalTo(panelView).offset(-9)
            make.height.equalTo(20)
            make.leading.greaterThanOrEqualTo(bookmarksView.snp.trailing)
        }
    }
    
    private func buildUserLine() -> UIView {
        let stackView = UIStackView()
        stackView.axis = .horizontal
        stackView.spacing = 8
        stackView.distribution = .fillProportionally
        stackView.isSkeletonable = true
        
        userImageView.snp.makeConstraints { (make) in
            make.width.equalTo(25)
        }
        stackView.addArrangedSubview(userImageView)
        
        usernameLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        stackView.addArrangedSubview(usernameLabel)
        
        let separator1 = UIView()
        separator1.backgroundColor = .lineGray
        separator1.snp.makeConstraints { (make) in
            make.width.equalTo(1)
        }
        stackView.addArrangedSubview(separator1)
        
        stackView.addArrangedSubview(lastForecastsView)
        
        let separator2 = UIView()
        separator2.backgroundColor = .lineGray
        separator2.snp.makeConstraints { (make) in
            make.width.equalTo(1)
        }
        stackView.addArrangedSubview(separator2)
        
        if !DeviceInfo.shared.smallScreen {
            incomeTitleLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
            stackView.addArrangedSubview(incomeTitleLabel)
        }
        
        incomeLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        stackView.addArrangedSubview(incomeLabel)
        
        return stackView
    }
}
