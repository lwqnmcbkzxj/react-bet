//
//  ForecastersHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastersHeader: UIView {
    private let buttonSelectedTint: UIColor = .mainOrange
    private let buttonUnselectedTint: UIColor = .lineGray
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.text = Text.forecastersRating
        return view
    }()
    
    let filtersButton: UIButton = {
        let button = UIButton(type: .system)
        let image = UIImage(named: "filtersIcon")?.withRenderingMode(.alwaysTemplate)
        button.setImage(image, for: .normal)
        button.tintColor = .lineGray
        button.isHidden = true //TODO: tempUI
        return button
    }()
    
    let timeFrameSegmenter: TimeFrameSelector = {
        let view = TimeFrameSelector()
        view.selectedSegment = 0
        view.clipsToBounds = false
        view.isHidden = true //TODO: tempUI
        return view
    }()
    
    let sportSelector: SportsControl = {
        let control = SportsControl()
        control.selectedIndex = 0
        control.isHidden = true //TODO: tempUI
        return control
    }()
    
    init() {
        super.init(frame: .zero)
        clipsToBounds = false
        makeLayout()
        filtersButton.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setCompact(_ compact: Bool) {
        sportSelector.isHidden = compact
    }
    
    @objc private func buttonTapped() {
        if filtersButton.tintColor == buttonSelectedTint {
            filtersButton.tintColor = buttonUnselectedTint
        } else {
            filtersButton.tintColor = buttonSelectedTint
        }
    }
    
    private func makeLayout() {
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalToSuperview().offset(27)
        }
        
        addSubview(timeFrameSegmenter)
        timeFrameSegmenter.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.top.equalTo(titleLabel.snp.bottom).offset(24)
            make.height.equalTo(33)
            make.width.equalTo(170)
        }
        
        addSubview(filtersButton)
        filtersButton.snp.makeConstraints { (make) in
            make.centerY.equalTo(timeFrameSegmenter.snp.centerY)
            make.trailing.equalToSuperview()
            make.width.height.equalTo(20)
        }
        
        addSubview(sportSelector)
        sportSelector.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(timeFrameSegmenter.snp.bottom).offset(20)
            make.height.equalTo(100)
        }
    }
}
