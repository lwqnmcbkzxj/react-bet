//
//  MatchBetsChart.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import Charts

class MatchBetsChart: UIView {
    
    private let chart: BarChartView = {
        let view = BarChartView()
        view.extraTopOffset = 0
        view.legend.setCustom(entries: [])
        view.rightAxis.enabled = false
        
        let yAxis = view.leftAxis
        yAxis.setLabelCount(5, force: true)
        yAxis.drawTopYLabelEntryEnabled = false
        yAxis.gridLineDashLengths = [1, 2]
        yAxis.axisLineColor = .clear
        yAxis.drawAxisLineEnabled = false
        yAxis.labelFont = .robotoRegular(size: 8)
        yAxis.labelTextColor = .textGray
        yAxis.granularityEnabled = true
        yAxis.axisMinimum = 0
        yAxis.axisMaximum = 4
        
        
        let xAxis = view.xAxis
        xAxis.labelPosition = .bottom
        xAxis.gridLineWidth = .zero
        xAxis.drawAxisLineEnabled = false
        xAxis.labelFont = .robotoRegular(size: 10)
        xAxis.labelTextColor = .textGray
        
        return view
    }()
    
    private let label: UILabel = {
        let label = UILabel()
        label.font = .robotoMedium(size: 19)
        label.textColor = .textGray
        label.text = Text.noBets
        label.isHidden = true
        return label
    }()
    
    private func setChart(with bets: [(String, Int)]) {
        chart.xAxis.valueFormatter = IndexAxisValueFormatter(values: bets.map {$0.0} )
        chart.xAxis.granularity = 1
        let entries = (0..<bets.count).map {
            BarChartDataEntry(x: Double($0),
                              y: Double(bets[$0].1))
        }
        let dataSet = BarChartDataSet(entries: entries)
        dataSet.colors = [UIColor.lineGray]
        dataSet.drawValuesEnabled = false
        dataSet.highlightEnabled = false
        let data = BarChartData(dataSet: dataSet)
        data.barWidth = Double(bets.count) / 8
        
        if let bet = bets.max(by: { $0.1 < $1.1 }),
            bet.1 > 4 {
            chart.leftAxis.axisMaximum = Double(bet.1)
        }
        
        chart.data = data
    }
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with bets: [Bet]) {
        var dict: [String: Int] = [:]
        for bet in bets {
            let old = dict[bet.type] ?? 0
            dict[bet.type] = old + 1
        }
        
        let topBets = dict.keys.map { ($0, dict[$0]!) }
        
        chart.isHidden = topBets.isEmpty
        setChart(with: topBets)
        
        label.isHidden = !bets.isEmpty
    }
    
    private func makeLayout() {
        addSubview(chart)
        chart.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        //Hides topmost gridline. No other workaround found
        let topMaskingView = UIView()
        topMaskingView.backgroundColor = .white
        addSubview(topMaskingView)
        topMaskingView.snp.makeConstraints { (make) in
            make.leading.trailing.top.equalToSuperview()
            make.height.equalTo(15)
        }
        
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.center.equalToSuperview()
        }
    }
}
