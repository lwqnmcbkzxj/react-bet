//
//  ForecastCellPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IForecastCellPresenter: class {
    
    func canChangeRating() -> Bool
    func canBookmark() -> Bool
    
    @discardableResult
    func addBookmark(forecast: Forecast) -> Forecast
    
    
    //    func ratingChanged(_ rating: RatingStatus, forecast: Forecast)
    
//    func isBookmarked(forecast: Forecast) -> Bool
//    func ratingStatus(forecast: Forecast) -> RatingStatus
}

class ForecastCellPresenter: IForecastCellPresenter {
    
    @LazyInjected
    private var forecastsService: IForecastService
    
    @LazyInjected
    private var authService: IAuthService
    
    func canBookmark() -> Bool {
        return authService.authError == nil
    }
    
    func canChangeRating() -> Bool {
        return authService.authError == nil
    }
    
    func addBookmark(forecast: Forecast) -> Forecast {
        if !canBookmark() {
            print("can't bookmark")
            return forecast
        }
        
        let bookmarked = forecastsService.localBookmarked(forecast: forecast) ?? forecast.apiBookmarked
        forecastsService.mark(!bookmarked, forecast: forecast)
        return forecast
    }
    
//    func ratingChanged(_ rating: RatingStatus, forecast: Forecast) {
//        if !canChangeRating() { print("can't change rating"); return}
//
//        forecastsService.rating(status: rating, forecast: forecast)
//    }
    
//    func isBookmarked(forecast: Forecast) -> Bool {
//        return forecastsService.isBookmarked(forecast: forecast)
//    }
//
//    func ratingStatus(forecast: Forecast) -> RatingStatus {
//        return forecastsService.ratingStatus(forecast: forecast)
//    }
}
