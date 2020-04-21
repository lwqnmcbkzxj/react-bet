//
//  BookmakerCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BookmakerCell: PanelCell {
    
    private let firmImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.cornerRadius = 5
        imageView.layer.masksToBounds = true
        imageView.backgroundColor = .gray
        return imageView
    }()
    
    private let ratingLabel: UILabel = {
        let view = UILabel()
        view.text = "rating"
        view.font = .robotoRegular(size: 15)
        view.textColor = .titleBlack
        view.textAlignment = .center
        return view
    }()
    
    private let bonusLabel: UILabel = {
        let view = UILabel()
        view.text = "1337 ₽"
        view.textColor = .mainOrange
        view.font = .robotoMedium(size: 15)
        view.textAlignment = .center
        return view
    }()
    
    private let reviewLabel: UILabel = {
        let view = UILabel()
        view.text = Text.review
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 13)
        view.textAlignment = .center
        return view
    }()
    
    private let linkImageView: UIImageView = {
        let image = UIImage(named: "linkIcon")
        let view = UIImageView(image: image)
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        backgroundColor = .white
        selectionStyle = .none
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        let guide = UILayoutGuide()
        contentView.addLayoutGuide(guide)
        guide.snp.makeConstraints { (make) in
            make.top.leading.bottom.equalToSuperview()
            make.width.equalToSuperview().dividedBy(3.2)
        }
        
        contentView.addSubview(firmImageView)
        firmImageView.snp.makeConstraints { (make) in
            make.leading.equalTo(guide).offset(8)
            make.trailing.lessThanOrEqualTo(guide.snp.trailing)
            make.centerY.equalTo(guide)
            make.height.equalToSuperview().multipliedBy(45.0/64).priority(.high)
            make.width.equalTo(firmImageView.snp.height).multipliedBy(2.13)
        }
        
        contentView.addSubview(ratingLabel)
        ratingLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(guide.snp.trailing)
            make.top.bottom.equalToSuperview()
            make.width.equalToSuperview().dividedBy(5)
        }

        contentView.addSubview(bonusLabel)
        bonusLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(ratingLabel.snp.trailing)
            make.top.bottom.equalToSuperview()
            make.width.equalToSuperview().dividedBy(5)
        }

        contentView.addSubview(reviewLabel)
        reviewLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(bonusLabel.snp.trailing)
            make.top.bottom.equalToSuperview()
        }

        contentView.addSubview(linkImageView)
        linkImageView.snp.makeConstraints { (make) in
            make.height.width.equalTo(20)
            make.centerY.equalToSuperview()
            make.trailing.equalToSuperview().offset(-8)
            make.leading.equalTo(reviewLabel.snp.trailing)
        }
    }
}