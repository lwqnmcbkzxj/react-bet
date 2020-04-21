//
//  MatchCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MatchCell: PanelCell {
    
    private let dateLabel: UILabel = {
        let label = UILabel()
        label.text = "СЕГОДНЯ"
        label.font = .robotoRegular(size: 10)
        label.textColor = .textGrayDark
        label.textAlignment = .center
        return label
    }()
    
    private let timeLabel: UILabel = {
        let label = UILabel()
        label.text = "16:40"
        label.font = .robotoRegular(size: 14)
        label.textColor = .textGrayDark
        label.textAlignment = .center
        return label
    }()
    
    private let sportImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.borderWidth = 1.5
        imageView.layer.borderColor = UIColor.lineGray.cgColor
        return imageView
    }()
    
    private let teamsLabel: UILabel = {
        let label = UILabel()
        label.text = "Mousesports - Virtus.pro"
        label.font = .robotoMedium(size: 14)
        label.textColor = .textGrayDark
        return label
    }()
    
    private let seasonLabel: UILabel = {
        let label = UILabel()
        label.text = "LPL Pro League Season 4"
        label.font = .robotoRegular(size: 10)
        label.textColor = .textGrayDark
        return label
    }()
    
    private let betsLabel: PositivityLabel = {
        let label = PositivityLabel()
        label.rounding = .integer
        label.units = .none
        label.showingSign = true
        label.textAlignment = .center
        label.setNumber(to: 122)
        return label
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        selectionStyle = .none
        backgroundColor = .white
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(dateLabel)
        dateLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.bottom.equalTo(snp.centerY)
            make.width.equalToSuperview().multipliedBy(0.17)
        }
        
        addSubview(timeLabel)
        timeLabel.snp.makeConstraints { (make) in
            make.top.equalTo(dateLabel.snp.bottom)
            make.leading.width.equalTo(dateLabel)
        }
        
        let imageGuide = UILayoutGuide()
        addLayoutGuide(imageGuide)
        imageGuide.snp.makeConstraints { (make) in
            make.leading.equalTo(timeLabel.snp.trailing)
            make.top.bottom.equalToSuperview()
            make.width.equalToSuperview().dividedBy(6)
        }
        
        addSubview(sportImageView)
        sportImageView.snp.makeConstraints { (make) in
            make.centerX.centerY.equalTo(imageGuide)
            make.width.height.equalTo(15)
        }
        
        addSubview(teamsLabel)
        teamsLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(imageGuide.snp.trailing)
            make.bottom.equalTo(snp.centerY).offset(-2)
            make.width.equalToSuperview().dividedBy(2)
        }
        
        addSubview(seasonLabel)
        seasonLabel.snp.makeConstraints { (make) in
            make.leading.width.equalTo(teamsLabel)
            make.top.equalTo(teamsLabel.snp.bottom)
        }
        
        addSubview(betsLabel)
        betsLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(teamsLabel.snp.trailing)
            make.centerY.trailing.equalToSuperview()
        }
    }
}
