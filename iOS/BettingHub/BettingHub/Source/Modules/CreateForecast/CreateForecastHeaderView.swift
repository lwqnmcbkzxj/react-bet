//
//  CreateForecastHeaderView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CreateForecastHeaderView: UITableViewHeaderFooterView {
    
    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 12
        return view
    }()
    
    private let headerTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.textAlignment = .center
        view.text = Text.addForecast.uppercased()
        return view
    }()
    
    private let matchSearchInput: InputView = {
        let view = InputView()
        view.label.text = ""
        let searchIcon = UIImage(named: "search")?.withRenderingMode(.alwaysTemplate)
        let rightImageView = UIImageView(image: searchIcon)
        rightImageView.tintColor = .titleBlack
        view.textField.rightView = rightImageView
        return view
    }()
    
    private let bookmakerInput: SelectionInputView = {
        let view = SelectionInputView()
        view.label.text = Text.bookmakerFirm
        return view
    }()
    
    private let sportInput: SelectionInputView = {
        let view = SelectionInputView()
        view.label.text = Text.sportKind
        return view
    }()
    
    private let championshipInput: SelectionInputView = {
        let view = SelectionInputView()
        view.label.text = Text.championship
        return view
    }()
    
    private let dateField: InputView = {
        let view = InputView()
        view.textField.isUserInteractionEnabled = false
        view.label.text = Text.eventDate
        return view
    }()
    
    private let timeField: InputView = {
        let view = InputView()
        view.textField.isUserInteractionEnabled = false
        view.label.text = Text.eventTime
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
        addSubview(headerTitleLabel)
        headerTitleLabel.snp.makeConstraints { (make) in
            make.top.leading.trailing.equalToSuperview()
            make.height.equalTo(60)
        }
        
        addSubview(stackView)
        stackView.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.top.equalTo(headerTitleLabel.snp.bottom)
        }
        
        let inputHeight = 76
        
        stackView.addArrangedSubview(matchSearchInput)
        matchSearchInput.snp.makeConstraints { (make) in
            make.height.equalTo(inputHeight)
        }
        
        stackView.addArrangedSubview(bookmakerInput)
        bookmakerInput.snp.makeConstraints { (make) in
            make.height.equalTo(inputHeight)
        }
        
        stackView.addArrangedSubview(sportInput)
        sportInput.snp.makeConstraints { (make) in
            make.height.equalTo(inputHeight)
        }
        
        stackView.addArrangedSubview(championshipInput)
        championshipInput.snp.makeConstraints { (make) in
            make.height.equalTo(inputHeight)
        }
        
        let lastRow = UIStackView()
        lastRow.axis = .horizontal
        lastRow.distribution = .fillEqually
        lastRow.spacing = 20
        lastRow.addArrangedSubview(dateField)
        lastRow.addArrangedSubview(timeField)
        
        stackView.addArrangedSubview(lastRow)
        lastRow.snp.makeConstraints { (make) in
            make.height.equalTo(inputHeight)
        }
    }
}
