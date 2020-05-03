//
//  ProfileHeaderView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ProfileHeaderView: UIView {
    
    private let profileImageView: UIImageView = {
//        let image = UIImage(named: "")
        let view = UIImageView()
        view.makeBordered()
        view.layer.masksToBounds = true
        view.layer.cornerRadius = 5
        return view
    }()
    
    private let usernameLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 24)
        view.text = "Usename"
        return view
    }()
    
    private let bankTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 14)
        view.text = "\(Text.BANK):"
        return view
    }()
    
    private let bankLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 14)
        return view
    }()
    
    private let roiLabel: PositivityLabel = {
        let view = PositivityLabel()
        view.rounding = .decimal(1)
        view.showingSign = true
        view.units = .percent
        view.font = .robotoMedium(size: 15)
        return view
    }()
    
    private let roiTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 15)
        view.text = Text.roiAllTime
        return view
    }()
    
    private let topSeparator: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    // Stats table /////
    
    private let winsView: StatsView = {
        let view = StatsView()
        view.set(title: Text.wins, value: "0", color: .positiveGreen)
        return view
    }()
    
    private let losesView: StatsView = {
        let view = StatsView()
        view.set(title: Text.loses, value: "0", color: .negativeRed)
        return view
    }()
    
    private let drawsView: StatsView = {
        let view = StatsView()
        view.set(title: Text.draws, value: "0", color: .drawBlue)
        return view
    }()
    
    private let subscribersView: StatsView = {
        let view = StatsView()
        view.set(title: Text.subscribers, value: "0", color: .titleBlack)
        return view
    }()
    
    private let placeView: StatsView = {
        let view = StatsView()
        view.set(title: Text.place, value: "0", color: .positiveGreen)
        return view
    }()
    
    private let netProfitView: StatsView = {
        let view = StatsView()
        view.set(title: Text.netProfit, value: "0%", color: .positiveGreen)
        return view
    }()
    
    // ///////
    
    let segmenter: ProfileSegmenterView = {
        let view = ProfileSegmenterView()
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.borderWidth = 1
        view.backgroundColor = .white
        return view
    }()
    
    init(isSelf: Bool) {
        super.init(frame: .zero)
        if isSelf {
            segmenter.setItems([Text.forecasts, Text.statistics, Text.favorites])
        } else {
            segmenter.setItems([Text.forecasts, Text.statistics])
        }
        
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        let panel = UIView()
        panel.backgroundColor = .clear
        panel.layer.cornerRadius = 7
        panel.layer.borderWidth = 1
        panel.layer.borderColor = UIColor.lineGray.cgColor
        
        addSubview(panel)
        panel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalToSuperview().offset(15)
            make.bottom.equalToSuperview().offset(-15)
        }
        
        panel.addSubview(profileImageView)
        profileImageView.snp.makeConstraints { (make) in
            make.leading.top.equalToSuperview().offset(8)
            make.width.height.equalTo(54)
        }
        
        panel.addSubview(usernameLabel)
        usernameLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(profileImageView.snp.trailing).offset(12)
            make.top.equalTo(profileImageView)
        }
        
        let bankStack = UIStackView()
        bankStack.axis = .horizontal
        bankStack.spacing = 5
        
        bankStack.addArrangedSubview(bankTitleLabel)
        bankStack.addArrangedSubview(bankLabel)
        
        panel.addSubview(bankStack)
        bankStack.snp.makeConstraints { (make) in
            make.leading.equalTo(usernameLabel)
            make.bottom.equalTo(profileImageView)
        }
        
        let roiStack = UIStackView()
        roiStack.axis = .horizontal
        roiStack.spacing = 5
        
        roiStack.addArrangedSubview(roiLabel)
        roiStack.addArrangedSubview(roiTitleLabel)
        
        panel.addSubview(roiStack)
        roiStack.snp.makeConstraints { (make) in
            make.leading.equalTo(profileImageView)
            make.top.equalTo(profileImageView.snp.bottom).offset(13)
        }
        
        panel.addSubview(topSeparator)
        topSeparator.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(1)
            make.top.equalTo(roiStack.snp.bottom).offset(16)
        }
        
        panel.addSubview(winsView)
        winsView.snp.makeConstraints { (make) in
            make.width.equalToSuperview().dividedBy(3)
            make.top.equalTo(topSeparator.snp.bottom).offset(10)
            make.leading.equalToSuperview()
            make.height.equalTo(55)
        }

        panel.addSubview(losesView)
        losesView.snp.makeConstraints { (make) in
            make.width.equalToSuperview().dividedBy(3)
            make.top.equalTo(topSeparator.snp.bottom).offset(10)
            make.leading.equalTo(winsView.snp.trailing)
            make.height.equalTo(55)
        }

        panel.addSubview(drawsView)
        drawsView.snp.makeConstraints { (make) in
            make.width.equalToSuperview().dividedBy(3)
            make.top.equalTo(topSeparator.snp.bottom).offset(10)
            make.leading.equalTo(losesView.snp.trailing)
            make.height.equalTo(55)
        }

        panel.addSubview(subscribersView)
        subscribersView.snp.makeConstraints { (make) in
            make.width.equalToSuperview().dividedBy(3)
            make.top.equalTo(winsView.snp.bottom).offset(5)
            make.leading.equalToSuperview()
            make.height.equalTo(55)
        }

        panel.addSubview(placeView)
        placeView.snp.makeConstraints { (make) in
            make.width.equalToSuperview().dividedBy(3)
            make.top.equalTo(winsView.snp.bottom).offset(5)
            make.leading.equalTo(subscribersView.snp.trailing)
            make.height.equalTo(55)
        }

        panel.addSubview(netProfitView)
        netProfitView.snp.makeConstraints { (make) in
            make.width.equalToSuperview().dividedBy(3)
            make.top.equalTo(winsView.snp.bottom).offset(5)
            make.leading.equalTo(placeView.snp.trailing)
            make.height.equalTo(55)
        }
        
        addSubview(segmenter)
        segmenter.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalTo(panel)
            make.height.equalTo(44)
        }
    }
}

private class StatsView: UIView {
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 13)
        view.textAlignment = .center
        return view
    }()
    
    private var valueLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 17)
        view.textAlignment = .center
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .clear
        
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalToSuperview().offset(5)
            make.height.equalTo(18)
        }
        
        addSubview(valueLabel)
        valueLabel.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.bottom.equalToSuperview().offset(-5)
            make.height.equalTo(23)
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func set(title: String, value: String, color: UIColor) {
        titleLabel.text = title
        valueLabel.text = value
        valueLabel.textColor = color
    }
}
