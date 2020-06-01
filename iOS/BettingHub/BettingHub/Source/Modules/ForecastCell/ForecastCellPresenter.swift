//
//  ForecastCellPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IForecastCellPresenter: class {
    
    func addBookmark(forecast: Forecast)
}

class ForecastCellPresenter: IForecastCellPresenter {
    
    @LazyInjected
    private var forecastsService: IForecastService
    
    func addBookmark(forecast: Forecast) {
        forecastsService.mark(forecastId: forecast.id)
    }
}
