//
//  CreateForecastHeaderView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CreateForecastHeaderView: UITableViewHeaderFooterView {
    
    @ModuleDependency(assembly: CreateForecastAssembly.shared)
    var presenter: ICreateForecastHeaderPresenter
    
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
    
    private let forecastTypePicker: ForecastTypePicker = {
        let view = ForecastTypePicker()
        return view
    }()
    
    private lazy var matchSearchInput: InputView = {
        let view = InputView()
        view.label.text = ""
        let searchIcon = UIImage(named: "search")!.withRenderingMode(.alwaysTemplate)
        let rightImageView = UIImageView(image: searchIcon)
        rightImageView.tintColor = .titleBlack
        view.textField.rightView = rightImageView
        view.textField.rightViewMode = .always
        view.textField.placeholder = "\(Text.matchSearch)..."
        presenter.manageTextField(view.textField, as: .matchSearch)
        return view
    }()
    
    private lazy var bookmakerInput: SelectionInputView<Bookmaker> = {
        let view = SelectionInputView<Bookmaker>()
        view.label.text = Text.bookmakerFirm
        presenter.manageTextField(view.textField, as: .bookmaker)
        presenter.bookmakers.bind { view.items = $0 }
        view.selectedItem.bind { (item) in
            self.presenter.selectedBookmaker = item
            self.presenter.fieldDataChanged(.bookmaker)
        }
        return view
    }()
    
    private lazy var sportInput: SelectionInputView<Sport> = {
        let view = SelectionInputView<Sport>()
        view.label.text = Text.sportKind
        presenter.manageTextField(view.textField, as: .sportKind)
        presenter.sportKinds.bind { view.items = $0 }
        view.selectedItem.bind { (item) in
            self.presenter.selectedSport = item
            self.presenter.fieldDataChanged(.sportKind)
        }
        return view
    }()
    
    private lazy var championshipInput: SelectionInputView<Championship> = {
        let view = SelectionInputView<Championship>()
        view.label.text = Text.championship
        presenter.manageTextField(view.textField, as: .championship)
        presenter.championships.bind { view.items = $0 }
        view.selectedItem.bind { (item) in
            self.presenter.selectedChampionship = item
            self.presenter.fieldDataChanged(.championship)
        }
        return view
    }()
    
    private lazy var matchInput: SelectionInputView<Match> = {
        let view = SelectionInputView<Match>()
        view.label.text = Text.match
        presenter.manageTextField(view.textField, as: .match)
        presenter.matches.bind { view.items = $0 }
        view.selectedItem.bind { (item) in
            self.presenter.selectedMatch = item
            self.presenter.fieldDataChanged(.match)
        }
        view.selectedItem.bind { (item) in
            guard let match = item else {
                return
            }
            let vm = MatchViewModelItem(match: match)
            self.dateField.textField.text = vm.fullDateText
            self.timeField.textField.text = vm.timeText
        }
        return view
    }()
    
    private lazy var dateField: InputView = {
        let view = InputView()
        view.label.text = Text.eventDate
        presenter.manageTextField(view.textField, as: .date)
        return view
    }()
    
    private lazy var timeField: InputView = {
        let view = InputView()
        view.label.text = Text.eventTime
        presenter.manageTextField(view.textField, as: .time)
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
        
        addSubview(forecastTypePicker)
        forecastTypePicker.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(headerTitleLabel.snp.bottom)
            make.height.equalTo(30)
        }
        
        addSubview(stackView)
        stackView.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.top.equalTo(forecastTypePicker.snp.bottom).offset(20)
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
        
        stackView.addArrangedSubview(matchInput)
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
