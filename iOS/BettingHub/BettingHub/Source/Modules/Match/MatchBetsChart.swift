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
        
        view.rightAxis.enabled = false
        
        let yAxis = view.leftAxis
        yAxis.setLabelCount(5, force: true)
        yAxis.drawTopYLabelEntryEnabled = false
        yAxis.gridLineDashLengths = [1, 2]
        yAxis.axisLineColor = .clear
        yAxis.drawAxisLineEnabled = false
        yAxis.labelFont = .robotoRegular(size: 8)
        yAxis.labelTextColor = .textGray
        
        
        let xAxis = view.xAxis
        xAxis.labelPosition = .bottom
        xAxis.gridLineWidth = .zero
        xAxis.drawAxisLineEnabled = false
        xAxis.labelFont = .robotoRegular(size: 10)
        xAxis.labelTextColor = .textGray
        xAxis.valueFormatter = IndexAxisValueFormatter(values: ["", "П1", "Х", "П2", "ТБ", "ТМ", "Другое"])
        
        let entries = [
            BarChartDataEntry(x: 1, y: 75),
            BarChartDataEntry(x: 2, y: 45),
            BarChartDataEntry(x: 3, y: 37),
            BarChartDataEntry(x: 4, y: 52),
            BarChartDataEntry(x: 5, y: 58),
            BarChartDataEntry(x: 6, y: 8)
        ]
        
        
        let dataSet = BarChartDataSet(entries: entries)
        dataSet.colors = [UIColor.lineGray]
        dataSet.drawValuesEnabled = false
        dataSet.highlightEnabled = false
        
        
        let data = BarChartData(dataSet: dataSet)
        data.barWidth = 0.6
        
        view.legend.setCustom(entries: [])
        view.data = data
        
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with bets: [Bet]) {
        //TODO: Implement
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
            make.height.equalTo(chart.xAxis.labelHeight)
        }
    }
}
