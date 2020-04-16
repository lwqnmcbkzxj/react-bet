//
//  BettingNavigationBar.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BettingNavigationBar: UINavigationBar {
    
    private let logoImageView: UIImageView = {
        let image = UIImage(named: "logoNavigation")
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFit
        return imageView
    }()
    
    private let bankLabel = BankView()
    
    private let searchButton: UIButton = {
        let button = UIButton(type: .system)
        let image = UIImage(named: "search")?.withRenderingMode(.alwaysOriginal)
        button.setImage(image, for: .normal)
        return button
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func configure() {
        isTranslucent = false
        barTintColor = .darkBlue
        bankLabel.setBalance(to: 1500) //TODO: DELETE
        titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.clear]
    }
    
    private func makeLayout() {
        addSubview(logoImageView)
        logoImageView.snp.makeConstraints { (make) in
            make.height.equalTo(32)
            make.width.equalTo(125)
            make.leading.equalToSuperview().offset(15)
            make.bottom.equalToSuperview().offset(-8)
        }
        
        addSubview(bankLabel)
        bankLabel.snp.contentHuggingHorizontalPriority = 1000
        bankLabel.snp.makeConstraints { (make) in
            make.centerY.equalTo(logoImageView)
            make.leading.equalTo(logoImageView.snp.trailing).offset(20).priority(.high)
            make.leading.greaterThanOrEqualTo(logoImageView.snp.trailing).offset(8)
        }
        
        addSubview(searchButton)
        searchButton.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(bankLabel)
            make.width.equalTo(searchButton.snp.height)
            make.leading.greaterThanOrEqualTo(bankLabel.snp.trailing).offset(8)
            make.trailing.equalToSuperview().offset(-23)
        }
    }
}

private class BankView: UIView {
    
    private let bankLabel: UILabel = {
        let label = UILabel()
        label.text = "\(Text.BANK): "
        label.font = .robotoRegular(size: 13)
        label.textColor = .white
        label.numberOfLines = 1
        return label
    }()
    
    private let balanceLabel: UILabel = {
        let label = UILabel()
        label.font = .robotoMedium(size: 13)
        label.textColor = .white
        label.numberOfLines = 1
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        layer.cornerRadius = 3
        backgroundColor = .grayBlue
        
        addSubview(bankLabel)
        bankLabel.snp.contentHuggingHorizontalPriority = 1000
        bankLabel.snp.contentCompressionResistanceHorizontalPriority = 1000
        bankLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(6)
        }
        
        addSubview(balanceLabel)
        balanceLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(bankLabel.snp.trailing)
            make.top.bottom.equalToSuperview()
            make.trailing.equalToSuperview().offset(-6)
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setBalance(to value: Double) {
        let balance = Int(floor(value))
        let text = "\(balance) xB"
        balanceLabel.text = text
    }
}
