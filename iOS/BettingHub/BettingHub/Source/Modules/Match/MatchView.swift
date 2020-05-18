//
//  MatchView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import Charts

class MatchView: UITableViewHeaderFooterView {
    
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
        view.font = .robotoRegular(size: 10)
        view.text = "26.07.2020"
        view.textAlignment = .center
        return view
    }()
    
    private let championshipLabel: UILabel = {
        let view = UILabel()
        view.numberOfLines = 2
        view.textColor = .textGrayDark
        view.font = .robotoRegular(size: 9)
        view.text = "LPL Pro League Season 4"
        view.textAlignment = .center
        return view
    }()
    
    private let timerLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 15)
        view.text = "1ч : 35м : 34с"
        view.textAlignment = .center
        return view
    }()
    
    private let leftTeamImageView: UIImageView = {
        let view = UIImageView()
        view.makeBordered()
        return view
    }()
    
    private let leftTeamLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 13)
        view.text = "Mousesports"
        view.textAlignment = .center
        return view
    }()
    
    private let rightTeamImageView: UIImageView = {
        let view = UIImageView()
        view.makeBordered()
        return view
    }()
    
    private let rightTeamLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 13)
        view.text = "Virtus.pro"
        view.textAlignment = .center
        return view
    }()
    
    private let topBetsLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 17)
        view.text = Text.topBets
        return view
    }()
    
    private let stackContainer: UIView = {
        let view = UIView()
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 7
        view.clipsToBounds = true
        return view
    }()
    
    private let lastBetsStack: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = -1
        return view
    }()
    
    private let popularBetsChart = MatchBetsChart()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(match: Match) {
        lastBetsStack.arrangedSubviews.forEach { $0.removeFromSuperview() }
        
        let columns = ColumnsSectionHeader()
        columns.columnsView.setMode(.lastBets)
        lastBetsStack.addArrangedSubview(columns)
        columns.snp.makeConstraints { (make) in
            make.height.equalTo(31)
        }
        
        (0..<6).forEach { (_) in
            let view = UserBetView()
            view.snp.makeConstraints { (make) in
                make.height.equalTo(56)
            }
            lastBetsStack.addArrangedSubview(view)
        }
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
            make.bottom.equalToSuperview().offset(-16)
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
            make.bottom.equalTo(timerLabel)
            make.leading.equalTo(centerGuide.snp.trailing).offset(5)
            make.trailing.equalToSuperview().offset(-5)
        }
        
        topPanel.addSubview(rightTeamImageView)
        rightTeamImageView.snp.makeConstraints { (make) in
            make.centerX.equalTo(rightTeamLabel)
            make.bottom.equalTo(rightTeamLabel.snp.top).offset(-11)
            make.height.width.equalTo(22)
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
        }
        
        addSubview(stackContainer)
        stackContainer.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(popularBetsChart.snp.bottom).offset(40)
            make.bottom.equalToSuperview().offset(-30)
        }
        
        stackContainer.addSubview(lastBetsStack)
        lastBetsStack.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
    }
}
