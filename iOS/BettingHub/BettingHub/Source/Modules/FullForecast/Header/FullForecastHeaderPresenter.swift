//
//  FullForecastHeaderPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IFullForecastHeaderPresenter: class {
    
    func forecast() -> Forecast
    
    func userTapped()
    
    func canBookmark() -> Bool
    
    func bookmark()
    
    func canSubscribe() -> Bool
    
    func subscribeTapped(callback: (((Bool)->Void))?)
}

class FullForecastHeaderPresenter {
    
    @LazyInjected
    private var authService: IAuthService
    
    @LazyInjected
    private var forecastService: IForecastService
    
    @LazyInjected
    private var forecasterService: IForecasterService
    
    let _forecast: Forecast
    let router: IFullForecastRouter
    
    init(forecast: Forecast, router: IFullForecastRouter) {
        self._forecast = forecast
        self.router = router
    }
}

extension FullForecastHeaderPresenter: IFullForecastHeaderPresenter {
    
    func forecast() -> Forecast {
        return _forecast
    }
    
    func userTapped() {
        router.showForecaster(_forecast.user)
    }
    
    func canBookmark() -> Bool {
        return authService.authError == nil
    }
    
    func bookmark() {
        let bookmarked = _forecast.bookmarked
        forecastService.mark(!bookmarked, forecast: _forecast)
    }
    
    func canSubscribe() -> Bool {
        return authService.authError == nil
    }
    
    func subscribeTapped(callback: (((Bool)->Void))?) {
        if !canSubscribe() { return }
        forecasterService.subscribe(forecaster: _forecast.user) { (res) in
            res.onSuccess { callback?($0) }
        }
    }
}
