//
//  ProfileStatisticsCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ProfileStatisticsCell: UITableViewCell {
    
    private let chartView: LinePieChartView = {
        let view = LinePieChartView()
        view.titleText = Text.profileStatsForecasts
        return view
    }()
    
    private let timeSelector: TimeFrameSelector = {
        let view = TimeFrameSelector()
        view.selectedTimeFrame = .all
        return view
    }()
    
    private let legendStack: UIStackView  = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 8
        view.distribution = .fillEqually
        return view
    }()
    
    private let statsStack: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 12
        view.distribution = .fillEqually
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        selectionStyle = .none
        makelayout()
        populateLegend()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with item: Forecaster) {
        populateChart(item)
        populateStats(item)
    }
    
    private func populateLegend() {
        legendStack.arrangedSubviews.forEach { (view) in
            view.removeFromSuperview()
        }
        
        let rows =
        [
            (UIColor.positiveGreen, Text.legendWins),
            (UIColor.negativeRed, Text.legendLoses),
            (UIColor.drawBlue, Text.legendDraws)
        ].map { legendRow(color: $0.0, text: $0.1)}
        
        rows.forEach { (row) in
            legendStack.addArrangedSubview(row)
        }
    }
    
    private func populateChart(_ item: Forecaster) {
        chartView.configure(with: [
            .init(value: Double(item.stats.wins), color: .positiveGreen),
            .init(value: Double(item.stats.back), color: .drawBlue),
            .init(value: Double(item.stats.loss), color: .negativeRed)
        ])
    }
    
    private func populateStats(_ item: Forecaster) {
        statsStack.arrangedSubviews.forEach { (view) in
            view.removeFromSuperview()
        }
        
        let rows =
        [
            (StatRowView.Mode.roi, 128.5),
            (.profit, 28),
            (.passing, 65),
            (.coefficient, 1.78),
        ].map { (rowInfo) -> StatRowView in
            let view = StatRowView()
            view.configure(mode: rowInfo.0, value: rowInfo.1)
            return view
        }
        
        rows.forEach { (row) in
            statsStack.addArrangedSubview(row)
        }
    }
    
    private func legendRow(color: UIColor, text: String) -> UIView {
        let view = UIView()
        
        let circle = UIView()
        circle.backgroundColor = color
        circle.layer.cornerRadius = 5.5
        
        let label = UILabel()
        label.font = .robotoRegular(size: 15)
        label.textColor = .titleBlack
        label.text = text
        
        view.addSubview(circle)
        circle.snp.makeConstraints { (make) in
            make.leading.centerY.equalToSuperview()
            make.height.width.equalTo(11)
        }
        
        view.addSubview(label)
        label.snp.makeConstraints { (make) in
            make.top.bottom.trailing.equalToSuperview()
            make.leading.equalTo(circle.snp.trailing).offset(7)
        }
        
        return view
    }
    
    private func makelayout() {
        contentView.addSubview(chartView)
        chartView.snp.makeConstraints { (make) in
            make.top.equalToSuperview()
            make.leading.equalToSuperview().offset(10)
            make.height.width.equalTo(snp.width).multipliedBy(0.36)
        }
        
        contentView.addSubview(timeSelector)
        timeSelector.snp.makeConstraints { (make) in
            make.top.equalToSuperview()
            make.leading.equalTo(chartView.snp.trailing).offset(19)
            make.width.equalTo(160)
            make.height.equalTo(33)
        }
        
        contentView.addSubview(legendStack)
        legendStack.snp.makeConstraints { (make) in
            make.leading.equalTo(timeSelector).offset(4)
            make.trailing.equalToSuperview()
            make.top.equalTo(timeSelector.snp.bottom).offset(15)
            make.height.equalTo(76)
        }
        
        contentView.addSubview(statsStack)
        statsStack.snp.makeConstraints { (make) in
            make.top.equalTo(chartView.snp.bottom).offset(23)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(123)
        }
    }
}
