//
//  FullForecastHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SnapKit

class FullForecastHeader: UITableViewHeaderFooterView {
    
    private let seasonLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGrayDark
        view.font = .robotoRegular(size: 14)
        view.numberOfLines = 2
        view.text = "Волейбол. NORCECA Women's Continental Championship"
        return view
    }()
    
    private let forecastDateLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 14)
        view.text = "03.04.2020 в 12:03"
        return view
    }()
    
    private let matchTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.text = "FLYTOMOON - TEAM UNIQUE"
        view.textAlignment = .center
        view.minimumScaleFactor = 0.7
        view.adjustsFontSizeToFitWidth = true
        return view
    }()
    
    private let teamsView  = TeamsVersusView()
    
    private let infoStack = InfoStackView()
    
    private let profileImageView: UIImageView = {
        let view = UIImageView()
        view.layer.cornerRadius = 5
        view.layer.masksToBounds = true
        return view
    }()
    
    let userPanel: UIView = {
        let view = UIView()
        view.backgroundColor = .hex(0xFCFCFC)
        view.layer.cornerRadius = 7
        return view
    }()
    
    private let usernameLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 15)
        view.text = "Никнейм"
        return view
    }()
    
    private let incomeTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 13)
        view.text = Text.income
        return view
    }()
    
    private let incomeLabel: PositivityLabel = {
        let view = PositivityLabel()
        view.font = .robotoMedium(size: 13)
        view.showingSign = false
        view.rounding = .integer
        view.units = .percent
        return view
    }()
    
    private let subscribeButton = SubscribeButton()
    
    private let descLabel: UILabel = {
        let view = UILabel()
        view.numberOfLines = 0
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 17)
        view.text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gub"
        return view
    }()
    
    private let commentsView: LabeledIconView = {
        let view = LabeledIconView()
        view.setImage(UIImage(named: "commentIcon")!)
        view.setText("3")
        return view
    }()
    
    private let bookMarksView: LabeledIconView = {
        let view = LabeledIconView()
        view.setImage(UIImage(named: "bookmarkIcon")!)
        view.setText("54")
        return view
    }()
    
    private let ratingView: ArrowsStepperView = {
        let view = ArrowsStepperView()
        return view
    }()
    
    private let numberOfCommentsLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 16)
        view.textAlignment = .left
        view.text = "16 Комментариев"
        view.numberOfLines = 0
        return view
    }()
    
    private var textHConstraint: Constraint?
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        backgroundColor = .white
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with forecast: Forecast) {
        let vm = ForecastViewModel(forecast: forecast)
        
        matchTitleLabel.text = forecast.event.name
        descLabel.text = forecast.text
        seasonLabel.text = forecast.event.championship.name
        forecastDateLabel.text = vm.creationDateText
        teamsView.leftTeamLabel.text = forecast.event.team1.name
        teamsView.rightTeamLabel.text = forecast.event.team2.name
        commentsView.setText("\(forecast.comments)")
        bookMarksView.setText("\(forecast.bookmarks)")
        profileImageView.setImage(url: forecast.user.avatar)
        usernameLabel.text = forecast.user.login
        infoStack.populateStack(labels: rowsForInfoStack(forecast: forecast, viewModel: vm))
        ratingView.setNumber(forecast.rating)
    }
    
    private func rowsForInfoStack(forecast: Forecast, viewModel: ForecastViewModel) -> [(UILabel, UILabel)] {
        return [
            plainRow(title: Text.tournament,
                     value: forecast.event.championship.name),
            plainRow(title: Text.dateTime,
                     value: viewModel.startDateText),
            boldRow(title: Text.forecastWord,
                    value: forecast.bet.type),
            plainRow(title: Text.coeficientWord,
                     value: "\(forecast.bet.coefficient)"),
            positivityRow(title: Text.bet,
                          value: forecast.bet.value),
            positivityRow(title: Text.possibleWin,
                          value: forecast.bet.value * forecast.bet.pureProfit)
        ]
    }
    
    private func plainRow(title: String, value: String) -> (UILabel, UILabel) {
        let titleLabel = label(text: title, weight: .regular)
        let valueLabel = label(text: value, weight: .regular)
        return (titleLabel, valueLabel)
    }

    private func boldRow(title: String, value: String) -> (UILabel, UILabel) {
        let titleLabel = label(text: title, weight: .regular)
        let valueLabel = label(text: value, weight: .bold)
        return (titleLabel, valueLabel)
    }

    private func positivityRow(title: String, value: Double) -> (UILabel, UILabel) {
        let titleLabel = label(text: title, weight: .regular)
        let valueLabel = positivityLabel(value: value)
        valueLabel.font = .robotoMedium(size: 14)
        return (titleLabel, valueLabel)
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
    
    private func makeLayout() {
        addSubview(seasonLabel)
        seasonLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.top.equalToSuperview().offset(22)
            make.height.equalTo(37)
        }
        
        addSubview(forecastDateLabel)
        forecastDateLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        forecastDateLabel.snp.makeConstraints { (make) in
            make.top.equalTo(seasonLabel)
            make.leading.greaterThanOrEqualTo(seasonLabel.snp.trailing)
            make.trailing.equalToSuperview()
        }
        
        
        addSubview(matchTitleLabel)
        matchTitleLabel.snp.makeConstraints { (make) in
            make.top.equalTo(seasonLabel.snp.bottom).offset(12)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(26)
        }
        
        
        addSubview(teamsView)
        teamsView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(matchTitleLabel.snp.bottom).offset(18)
            make.height.equalTo(75)
        }
        
        
        addSubview(infoStack)
        infoStack.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(teamsView.snp.bottom).offset(29)
            make.height.equalTo(205)
        }
        
        
        let panel = makeUserPanel()
        addSubview(panel)
        panel.snp.makeConstraints { (make) in
            make.top.equalTo(infoStack.snp.bottom)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(57)
        }
        
        
        addSubview(descLabel)
        descLabel.snp.makeConstraints { (make) in
            make.top.equalTo(panel.snp.bottom).offset(25)
            make.leading.equalToSuperview().offset(9)
            make.trailing.equalToSuperview().offset(-9)
        }
        
        
        addSubview(commentsView)
        commentsView.snp.makeConstraints { (make) in
            make.top.equalTo(descLabel.snp.bottom).offset(22)
            make.leading.equalTo(descLabel)
            make.height.equalTo(20)
        }
        
        addSubview(bookMarksView)
        bookMarksView.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(commentsView)
            make.leading.equalTo(commentsView.snp.trailing).offset(15)
        }
        
        
        addSubview(ratingView)
        ratingView.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(commentsView)
            make.trailing.equalTo(descLabel)
        }
        
        addSubview(numberOfCommentsLabel)
        numberOfCommentsLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(commentsView.snp.bottom).offset(39)
            make.bottom.equalToSuperview().offset(-32)
            make.height.equalTo(18)
        }
    }
    
    
    
    private func makeUserPanel() -> UIView {
        userPanel.addSubview(profileImageView)
        profileImageView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(8)
            make.top.equalToSuperview().offset(12)
            make.bottom.equalToSuperview().offset(-8)
            make.width.equalTo(profileImageView.snp.height)
        }
        
        userPanel.addSubview(usernameLabel)
        usernameLabel.snp.makeConstraints { (make) in
            make.top.equalTo(profileImageView)
            make.leading.equalTo(profileImageView.snp.trailing).offset(7)
        }
        
        userPanel.addSubview(incomeTitleLabel)
        incomeTitleLabel.snp.makeConstraints { (make) in
            make.bottom.equalTo(profileImageView)
            make.leading.equalTo(usernameLabel)
            make.top.equalTo(usernameLabel.snp.bottom).offset(2)
        }
        
        userPanel.addSubview(incomeLabel)
        incomeLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(incomeTitleLabel)
            make.leading.equalTo(incomeTitleLabel.snp.trailing).offset(5)
        }
        
        userPanel.addSubview(subscribeButton)
        subscribeButton.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(12)
            make.bottom.equalToSuperview().offset(-11)
            make.trailing.equalToSuperview().offset(-8)
            make.width.equalTo(130)
        }
        
        return userPanel
    }
}
