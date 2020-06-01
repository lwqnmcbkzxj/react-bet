//
//  CreateForecastFooterView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CreateForecastFooterView: UITableViewHeaderFooterView {
    
    let manager = BetAmountFieldsManager()
    
    private let coeffField: InputView = {
        let view = InputView()
        view.label.text = Text.firmCoeff
        view.isUserInteractionEnabled = false
        return view
    }()
    
    private let outcomeField: InputView = {
        let view = InputView()
        view.label.text = Text.outcome
        view.isUserInteractionEnabled = false
        return view
    }()
    
    private lazy var betPercentField: InputView = {
        let view = InputView()
        view.label.text = "\(Text.bet) %"
        view.textField.delegate = manager
        manager.percentsField = view.textField
        return view
    }()
    
    private lazy var betField: InputView = {
        let view = InputView()
        view.label.text = Text.bet
        view.textField.delegate = manager
        manager.currencyField = view.textField
        return view
    }()
    
    private let descLabel: UILabel = {
        let view = UILabel()
        view.font = .robotoRegular(size: 15)
        view.textColor = .textGray
        view.text = Text.forecastDesc
        return view
    }()
    
    private let descTextView: UITextView = {
        let view = UITextView()
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 7
        return view
    }()
    
    private let addButton: BottomButton = {
        let view = BottomButton()
        view.setTitle(Text.addForecast, for: .normal)
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        
        let stack1 = UIStackView()
        stack1.distribution = .fillEqually
        stack1.spacing = 20
        stack1.addArrangedSubview(coeffField)
        stack1.addArrangedSubview(outcomeField)
        addSubview(stack1)
        stack1.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(20)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(76)
        }
        
        
        let stack2 = UIStackView()
        stack2.distribution = .fillEqually
        stack2.spacing = 20
        stack2.addArrangedSubview(betPercentField)
        stack2.addArrangedSubview(betField)
        addSubview(stack2)
        stack2.snp.makeConstraints { (make) in
            make.top.equalTo(stack1.snp.bottom).offset(12)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(76)
        }
        
        addSubview(descLabel)
        descLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(stack2.snp.bottom).offset(28)
        }
        
        addSubview(descTextView)
        descTextView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(descLabel.snp.bottom).offset(8)
            make.height.equalTo(132)
        }
        
        addSubview(addButton)
        addButton.snp.makeConstraints { (make) in
            make.top.equalTo(descTextView.snp.bottom).offset(44)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(40)
            make.bottom.equalToSuperview().offset(-20)
        }
    }
}
