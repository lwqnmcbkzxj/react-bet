//
//  ForecastViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ForecastViewModel {
    
    let forecast: Forecast
    
    var startDateText: String {
        let dateStr = ForecastViewModel.dateFormatter.string(from: forecast.event.date)
        return dateStr
    }
    
    var creationDateText: String {
        let dateStr = ForecastViewModel.dateFormatter.string(from: forecast.creationDate)
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
