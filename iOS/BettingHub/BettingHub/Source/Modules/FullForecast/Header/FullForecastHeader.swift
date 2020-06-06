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
    
    var presenter: IFullForecastHeaderPresenter! {
        didSet {
            guard let presenter = presenter else { return }
            configure(with: presenter.forecast())
            presenter.storeBinds(callback: binds)
        }
    }
    
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
        view.contentMode = .scaleAspectFill
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
        view.showingSign = true
        view.rounding = .integer
        view.units = .percent
        return view
    }()
    
    let subscribeButton: SubscribeButton = {
        let view = SubscribeButton()
        return view
    }()
    
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
    
    private let bookmarksView: LabeledIconWithNumber = {
        let view = LabeledIconWithNumber()
        let image = UIImage(named: "bookmarkIcon")!
        let selected = UIImage(named: "bookmarkIconSelected")!
        view.setImage(image, selectedImage: selected)
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
        view.numberOfLines = 0
        view.isHidden = true //TODO: tempUI
        return view
    }()
    
    private var textHConstraint: Constraint?
    
    init(forecast: Forecast) {
        super.init(reuseIdentifier: nil)
        backgroundColor = .white
        makeLayout()
        
        let gesture = UITapGestureRecognizer(target: self, action: #selector(userTapped))
        userPanel.addGestureRecognizer(gesture)
        
        bookmarksView.setTapAction(action: bookmarkTapped)
        subscribeButton.addTarget(self, action: #selector(subscribeTapped), for: .touchUpInside)
        ratingView.delegate = self
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func binds() -> [ObservableBind] {
        let forecast = presenter.forecast()
        return [
            forecast.bookmarked.bind { self.bookmarksView.isSelected = $0 },
            forecast.bookmarks.bind { self.bookmarksView.setNumber($0) },
            forecast.user.subscribed.bind { self.subscribeButton.subscribed = $0 },
            forecast.ratingStatus.bind { self.ratingView.stepperState = $0 },
            forecast.rating.bind { self.ratingView.setNumber($0) }
        ]
    }
    
    private func configure(with forecast: Forecast) {
        let vm = ForecastViewModelItem(forecast: forecast)
        
        descLabel.text = forecast.text.data
        commentsView.setText("\(forecast.comments.data)")
        
        let event = forecast.event.data
        matchTitleLabel.text = event.name
        seasonLabel.text = event.championship.name
        forecastDateLabel.text = vm.creationDateText
        teamsView.leftTeamLabel.text = event.team1.name
        teamsView.rightTeamLabel.text = event.team2.name
        teamsView.leftImageView.setServerIcon(url: event.championship.sport.image)
        teamsView.rightImageView.setServerIcon(url: event.championship.sport.image)
        
        
        let user = forecast.user
        profileImageView.setImage(url: user.avatar.data)
        usernameLabel.text = user.login.data
        subscribeButton.subscribed = user.subscribed.data
        
        infoStack.populateStack(labels: rowsForInfoStack(forecast: forecast, viewModel: vm))
        incomeLabel.setNumber(to: vm.forecasterItem.signedPercentRoi)
        
        ratingView.isUserInteractionEnabled = presenter.canRate()
        ratingView.setNumber(forecast.rating.data)
        ratingView.stepperState = forecast.ratingStatus.data
        
        bookmarksView.isUserInteractionEnabled = presenter.canBookmark()
        bookmarksView.setNumber(forecast.bookmarks.data)
        bookmarksView.isSelected = forecast.bookmarked.data
        
        subscribeButton.isHidden = !presenter.canSubscribe()
        
    }
    
    @objc private func userTapped() {
        presenter.userTapped()
    }
    
    private func bookmarkTapped() {
        presenter.bookmark()
        configure(with: presenter.forecast())
    }
    
    @objc private func subscribeTapped() {
        presenter.subscribeTapped(callback: nil)
    }
    
    private func rowsForInfoStack(forecast: Forecast, viewModel: ForecastViewModelItem) -> [(UILabel, UILabel)] {
        
        let event = forecast.event.data
        let bet = forecast.bet.data
        
        return [
            plainRow(title: Text.tournament,
                     value: event.championship.name),
            plainRow(title: Text.dateTime,
                     value: viewModel.startDateText),
            boldRow(title: Text.forecastWord,
                    value: bet.type),
            plainRow(title: Text.coeficientWord,
                     value: "\(bet.coefficient)"),
            positivityRow(title: Text.bet,
                          value: bet.value),
            positivityRow(title: Text.possibleWin,
                          value: bet.value * bet.pureProfit)
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
            make.height.lessThanOrEqualTo(37)
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
        
        addSubview(bookmarksView)
        bookmarksView.snp.makeConstraints { (make) in
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

extension FullForecastHeader: ArrowsStepperViewDelegate {
    
    func arrowsStepper(_ arrowsStepper: ArrowsStepperView, needsStatus status: RatingStatus) {
        presenter.rate(status: status)
    }
}
