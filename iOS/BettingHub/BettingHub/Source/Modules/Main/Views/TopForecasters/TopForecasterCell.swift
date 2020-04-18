//
//  TopForecasterCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TopForecasterCell: UICollectionViewCell {
    
    private let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.layer.cornerRadius = 4
        imageView.clipsToBounds = true
        return imageView
    }()
    
    private let userLabel: UILabel = {
        let label = UILabel()
        label.text = "username"
        label.font = .robotoRegular(size: 12)
        label.textAlignment = .center
        label.numberOfLines = 1
        return label
    }()
    
    private let iconImageView: UIImageView = {
        let image = UIImage(named: "incomeIcon")
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFit
        return imageView
    }()
    
    private let incomeLabel: PositivityLabel = {
        let label = PositivityLabel()
        label.text = "income"
        label.font = .robotoRegular(size: 12)
        label.textColor = .positiveGreen
        label.textAlignment = .right
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        makeConstraints()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setupCell(forecaster: Forecaster) {
        setupIncomeLabel(income: forecaster.income)
        userLabel.text = forecaster.username
        imageView.setImage(url: forecaster.profilePicture)
    }
    
    private func setupIncomeLabel(income: Double) {
        incomeLabel.setNumber(to: income)
    }
    
    private func makeConstraints() {
        addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.top.leading.trailing.equalToSuperview()
            make.height.equalTo(imageView.snp.width)
        }
        
        addSubview(userLabel)
        userLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(imageView.snp.bottom).offset(1)
        }
        
        addSubview(iconImageView)
        iconImageView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.top.equalTo(userLabel.snp.bottom).offset(7)
            make.width.height.equalTo(11)
        }
        
        addSubview(incomeLabel)
        incomeLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(iconImageView)
            make.leading.equalTo(iconImageView.snp.trailing)
            make.trailing.equalToSuperview()
        }
    }
}
