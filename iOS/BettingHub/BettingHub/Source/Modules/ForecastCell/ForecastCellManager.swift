//
//  ForecastCellManager.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecastCellManager {
    
    @LazyInjected
    private var forecastsService: IForecastService
    
    @LazyInjected
    private var authService: IAuthService
    
    private var binds: [ObservableBind] = []
    
    func storeBinds(binds: [ObservableBind]) {
        self.binds.forEach { $0.close() }
        self.binds = binds
    }
    
    func canBookmark() -> Bool {
        return authService.authError == nil
    }
    
    func canChangeRating() -> Bool {
        return authService.authError == nil
    }
    
    func addBookmark(forecast: Forecast) {
        if !canBookmark() {
            print("can't bookmark")
        }
        
        let bookmarked = forecast.bookmarked.data
        forecastsService.mark(!bookmarked, forecast: forecast)
    }
    
    func changeRating(to status: RatingStatus, forecast: Forecast) {
//        let curr = forecast.ratingStatus.data
//        let new = curr.apply(status: status)
        forecastsService.rating(status: status, forecast: forecast)
    }
}
