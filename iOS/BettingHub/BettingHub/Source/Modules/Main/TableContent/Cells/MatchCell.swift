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
        label.isSkeletonable = true
        return label
    }()
    
    private let timeLabel: UILabel = {
        let label = UILabel()
        label.text = "16:40"
        label.font = .robotoRegular(size: 14)
        label.textColor = .textGrayDark
        label.textAlignment = .center
        label.isSkeletonable = true
        return label
    }()
    
    private let sportImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.isSkeletonable = true
        return imageView
    }()
    
    private let teamsLabel: UILabel = {
        let label = UILabel()
        label.text = "Mousesports - Virtus.pro"
        label.font = .robotoMedium(size: 14)
        label.textColor = .textGrayDark
        label.isSkeletonable = true
        return label
    }()
    
    private let seasonLabel: UILabel = {
        let label = UILabel()
        label.text = "LPL Pro League Season 4"
        label.font = .robotoRegular(size: 10)
        label.textColor = .textGrayDark
        label.isSkeletonable = true
        return label
    }()
    
    private let betsLabel: PositivityLabel = {
        let label = PositivityLabel()
        label.rounding = .integer
        label.units = .none
        label.showingSign = true
        label.textAlignment = .center
        label.setNumber(to: 122)
        label.isSkeletonable = true
        return label
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        selectionStyle = .none
        backgroundColor = .white
        isSkeletonable = true
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with item: Match) {
        let vm = MatchViewModelItem(match: item)
        
        dateLabel.text = vm.dateText
        timeLabel.text = vm.timeText
        
        let sport = item.championship.sport
        sportImageView.setServerIcon(url: sport.image)
        
        teamsLabel.text = item.name
        seasonLabel.text = item.championship.name
        
        betsLabel.setNumber(to: Double(item.betsCount ?? 0))
    }
    
    private func makeLayout() {
        contentView.addSubview(dateLabel)
        dateLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(4)
            make.bottom.equalTo(snp.centerY).offset(-1)
            make.width.equalToSuperview().multipliedBy(0.17)
        }
        
        contentView.addSubview(timeLabel)
        timeLabel.snp.makeConstraints { (make) in
            make.top.equalTo(dateLabel.snp.bottom).offset(1)
            make.centerX.equalTo(dateLabel)
        }
        
        let imageGuide = UILayoutGuide()
        addLayoutGuide(imageGuide)
        imageGuide.snp.makeConstraints { (make) in
            make.leading.equalTo(timeLabel.snp.trailing)
            make.top.bottom.equalToSuperview()
            make.width.equalToSuperview().dividedBy(6)
        }
        
        contentView.addSubview(sportImageView)
        sportImageView.snp.makeConstraints { (make) in
            make.centerX.centerY.equalTo(imageGuide)
            make.width.height.equalTo(15)
        }
        
        contentView.addSubview(teamsLabel)
        teamsLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(imageGuide.snp.trailing)
            make.bottom.equalTo(snp.centerY).offset(-2)
            make.width.equalToSuperview().dividedBy(2)
        }
        
        contentView.addSubview(seasonLabel)
        seasonLabel.snp.makeConstraints { (make) in
            make.leading.width.equalTo(teamsLabel)
            make.top.equalTo(teamsLabel.snp.bottom).offset(4)
        }
        
        contentView.addSubview(betsLabel)
        betsLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(teamsLabel.snp.trailing).offset(4)
            make.centerY.equalToSuperview()
            make.trailing.equalToSuperview().offset(-4)
        }
    }
}
