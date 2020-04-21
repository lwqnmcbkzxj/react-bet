//
//  ForecastsHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastsHeader: UIView {
    
    private let buttonSelectedTint: UIColor = .mainOrange
    private let buttonUnselectedTint: UIColor = .lineGray
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.text = Text.forecasts
        return view
    }()
    
    let filtersButton: UIButton = {
        let button = UIButton(type: .system)
        let image = UIImage(named: "filtersIcon")?.withRenderingMode(.alwaysTemplate)
        button.setImage(image, for: .normal)
        button.tintColor = .lineGray
        return button
    }()
    
    private let forecastsSegmenter: PanelSegmenterControl = {
        let view = PanelSegmenterControl(items: [Text.subscribtions, Text.allForecasts, Text.paid])
        view.selectedSegment = 1
        return view
    }()
    
    private let nearestTitleLabel: UILabel = {
        let view = UILabel()
        view.text = Text.nearest
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 16)
        return view
    }()
    
    private let timePicker: TimePicker = {
        let view = TimePicker(items: ["Все время"])
        view.selectedItem = 0
        return view
    }()
    
    private let selectionControl: SportsControl = {
        let control = SportsControl()
        control.selectedIndex = 0
        return control
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
        
        filtersButton.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
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
            make.leading.equalToSuperview()
            make.top.equalToSuperview().offset(27)
        }
        
        addSubview(filtersButton)
        filtersButton.snp.makeConstraints { (make) in
            make.top.equalTo(titleLabel)
            make.trailing.equalToSuperview()
            make.width.height.equalTo(20)
        }
        
        addSubview(forecastsSegmenter)
        forecastsSegmenter.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.trailing.equalToSuperview()
            make.top.equalTo(titleLabel.snp.bottom).offset(24)
            make.height.equalTo(33)
        }
        
        addSubview(nearestTitleLabel)
        nearestTitleLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.top.equalTo(forecastsSegmenter.snp.bottom).offset(32)
        }
        
        addSubview(timePicker)
        timePicker.snp.makeConstraints { (make) in
            make.top.equalTo(forecastsSegmenter.snp.bottom).offset(27)
            make.leading.equalTo(nearestTitleLabel.snp.trailing).offset(12)
            make.height.equalTo(33)
            make.width.equalTo(160)
        }
        
        addSubview(selectionControl)
        selectionControl.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.trailing.equalToSuperview()
            make.top.equalTo(timePicker.snp.bottom).offset(20)
            make.height.equalTo(100)
        }
    }
}

#if canImport(SwiftUI) && DEBUG
import SwiftUI
@available(iOS 13, *)
struct ForecastsHeaderPreview: PreviewProvider {
    static var previews: some View {
        UIViewPreview {
            ForecastsHeader()
        }
    }
}
#endif
