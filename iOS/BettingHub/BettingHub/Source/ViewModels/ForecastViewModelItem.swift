//
//  ForecastViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ForecastViewModelItem {
    
    let forecast: Forecast
    
    let forecasterItem: ForecasterViewModelItem
    
    init(forecast: Forecast) {
        self.forecast = forecast
        self.forecasterItem = ForecasterViewModelItem(forecaster: forecast.user)
    }
    
    var startDateText: String {
        let event = forecast.event.data
        let dateStr = ForecastViewModelItem.dateFormatter.string(from: event.date)
        return dateStr
    }
    
    var creationDateText: String {
        let dateStr = ForecastViewModelItem.dateFormatter.string(from: forecast.creationDate.data)
        return dateStr
    }
    
    private static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
//        formatter.dateFormat = "yyyy-MM-dd HH:mm"
        return formatter
    }()
}
