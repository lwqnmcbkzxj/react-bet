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
        imageView.isSkeletonable = true
        return imageView
    }()
    
    private let userLabel: UILabel = {
        let label = UILabel()
        label.text = "username"
        label.font = .robotoRegular(size: 12)
        label.textAlignment = .center
        label.numberOfLines = 1
        label.isSkeletonable = true
        return label
    }()
    
    private let iconImageView: UIImageView = {
        let image = UIImage(named: "incomeIcon")
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFit
        imageView.isSkeletonable = true
        return imageView
    }()
    
    private let incomeLabel: PositivityLabel = {
        let label = PositivityLabel()
        label.text = "income"
        label.font = .robotoRegular(size: 12)
        label.textColor = .positiveGreen
        label.textAlignment = .right
        label.isSkeletonable = true
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        isSkeletonable = true
        makeConstraints()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setupCell(forecaster: Forecaster) {
        let vm = ForecasterViewModelItem(forecaster: forecaster)
        let income = round(vm.signedPercentRoi)
        setupIncomeLabel(income: income)
        userLabel.text = forecaster.login
        imageView.setImage(url: forecaster.avatar)
    }
    
    private func setupIncomeLabel(income: Double) {
        incomeLabel.setNumber(to: income)
    }
    
    private func makeConstraints() {
        
        contentView.addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.top.leading.trailing.equalToSuperview()
            make.height.equalTo(imageView.snp.width)
        }
        
        contentView.addSubview(userLabel)
        userLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(imageView.snp.bottom).offset(1)
        }
        
        contentView.addSubview(iconImageView)
        iconImageView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.top.equalTo(userLabel.snp.bottom).offset(7)
            make.width.height.equalTo(11)
        }
        
        contentView.addSubview(incomeLabel)
        incomeLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(iconImageView)
            make.leading.equalTo(iconImageView.snp.trailing)
            make.trailing.equalToSuperview()
        }
    }
}
