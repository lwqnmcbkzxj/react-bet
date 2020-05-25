//
//  MatchView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import Charts

class MatchView: UIView {
    
    private let topPanel: UIView = {
        let view = UIView()
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 7
        return view
    }()
    
    private let timeLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 21)
        view.text = "19:00"
        view.textAlignment = .center
        return view
    }()
    
    private let dateLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGrayDark
        view.font = .robotoRegular(size: 11)
        view.text = "26.07.2020"
        view.textAlignment = .center
        return view
    }()
    
    private let championshipLabel: UILabel = {
        let view = UILabel()
        view.numberOfLines = 2
        view.textColor = .textGrayDark
        view.font = .robotoRegular(size: 10)
        view.text = "LPL Pro League Season 4"
        view.textAlignment = .center
        return view
    }()
    
    private let timerLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 15)
        view.textAlignment = .center
        return view
    }()
    
    private let leftTeamImageView: UIImageView = {
        let view = UIImageView()
        return view
    }()
    
    private let leftTeamLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 13)
        view.text = "Mousesports"
        view.textAlignment = .center
        view.numberOfLines = 2
        return view
    }()
    
    private let rightTeamImageView: UIImageView = {
        let view = UIImageView()
        return view
    }()
    
    private let rightTeamLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 13)
        view.text = "Virtus.pro"
        view.textAlignment = .center
        view.numberOfLines = 2
        return view
    }()
    
    private let topBetsLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 17)
        view.text = Text.topBets
        return view
    }()
    
    private let popularBetsChart = MatchBetsChart()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(match: Match) {
        let vm = MatchViewModelItem(match: match)
        
        leftTeamLabel.text = match.team1.name
        leftTeamImageView.setServerIcon(url: match.championship.sport.image)
        
        rightTeamLabel.text = match.team2.name
        rightTeamImageView.setServerIcon(url: match.championship.sport.image)
        
        timeLabel.text = vm.timeText
        dateLabel.text = vm.fullDateText
        timerLabel.text = vm.timerText
        
        championshipLabel.text = match.championship.name

        popularBetsChart.configure(with: match.forecasts?.map { $0.bet } ?? [])
    }
    
    func timer(to str: String) {
        timerLabel.text = str
    }
    
    private func makeLayout() {
        addSubview(topPanel)
        topPanel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalToSuperview()
            make.height.equalTo(101)
        }
        
        let centerGuide = UILayoutGuide()
        topPanel.addLayoutGuide(centerGuide)
        centerGuide.snp.makeConstraints { (make) in
            make.centerX.equalTo(topPanel)
            make.width.equalTo(topPanel).dividedBy(3)
        }
        
        topPanel.addSubview(timeLabel)
        timeLabel.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(6)
            make.leading.trailing.equalTo(centerGuide)
        }
        
        topPanel.addSubview(dateLabel)
        dateLabel.snp.makeConstraints { (make) in
            make.top.equalTo(timeLabel.snp.bottom)
            make.leading.trailing.equalTo(centerGuide)
        }
        
        topPanel.addSubview(timerLabel)
        timerLabel.snp.makeConstraints { (make) in
            make.bottom.equalToSuperview().offset(-14)
            make.leading.trailing.equalTo(centerGuide)
        }
        
        topPanel.addSubview(championshipLabel)
        championshipLabel.snp.makeConstraints { (make) in
            make.bottom.equalTo(timerLabel.snp.top).offset(-2)
            make.leading.trailing.equalTo(centerGuide)
        }
        
        topPanel.addSubview(leftTeamLabel)
        leftTeamLabel.snp.makeConstraints { (make) in
            make.bottom.equalTo(timerLabel)
            make.leading.equalToSuperview().offset(5)
            make.trailing.equalTo(centerGuide.snp.leading).offset(-5)
        }
        
        topPanel.addSubview(leftTeamImageView)
        leftTeamImageView.snp.makeConstraints { (make) in
            make.centerX.equalTo(leftTeamLabel)
            make.bottom.equalTo(leftTeamLabel.snp.top).offset(-11)
            make.height.width.equalTo(22)
        }
        
        topPanel.addSubview(rightTeamLabel)
        rightTeamLabel.snp.makeConstraints { (make) in
            make.top.equalTo(leftTeamLabel)
            make.leading.equalTo(centerGuide.snp.trailing).offset(5)
            make.trailing.equalToSuperview().offset(-5)
        }
        
        topPanel.addSubview(rightTeamImageView)
        rightTeamImageView.snp.makeConstraints { (make) in
            make.centerX.equalTo(rightTeamLabel)
            make.top.bottom.width.equalTo(leftTeamImageView)
        }
        
        
        addSubview(topBetsLabel)
        topBetsLabel.snp.makeConstraints { (make) in
            make.top.equalTo(topPanel.snp.bottom).offset(16)
            make.centerX.equalToSuperview()
        }
        
        addSubview(popularBetsChart)
        popularBetsChart.snp.makeConstraints { (make) in
            make.top.equalTo(topBetsLabel.snp.bottom).offset(6)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(150)
            make.bottom.equalToSuperview().offset(-40)
        }
    }
}
