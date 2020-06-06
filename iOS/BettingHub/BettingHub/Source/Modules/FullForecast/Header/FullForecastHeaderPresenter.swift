//
//  FullForecastHeaderPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IFullForecastHeaderPresenter: class {
    
    func storeBinds(callback: (()->[ObservableBind])?)
    
    func forecast() -> Forecast
    
    func userTapped()
    
    func canBookmark() -> Bool
    
    func bookmark()
    
    func canSubscribe() -> Bool
    
    func subscribeTapped(callback: (((Bool)->Void))?)
    
    func canRate() -> Bool
    
    func rate(status: RatingStatus)
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
    
    private var binds: [ObservableBind] = []
    
    init(forecast: Forecast, router: IFullForecastRouter) {
        self._forecast = forecast
        self.router = router
    }
}

extension FullForecastHeaderPresenter: IFullForecastHeaderPresenter {
    
    func storeBinds(callback: (() -> [ObservableBind])?) {
        binds.forEach { $0.close() }
        binds = callback?() ?? []
    }
    
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
        let bookmarked = forecast().bookmarked.data
        forecastService.mark(!bookmarked, forecast: forecast())
    }
    
    func canSubscribe() -> Bool {
        return authService.authError == nil
    }
    
    func subscribeTapped(callback: (((Bool)->Void))?) {
        if !canSubscribe() { return }
        forecasterService.subscribe(forecaster: forecast().user)
    }
    
    func canRate() -> Bool {
        return authService.authError == nil 
    }
    
    func rate(status: RatingStatus) {
        let curr = forecast().ratingStatus.data
        let new = curr.apply(status: status)
        forecastService.rating(status: new, forecast: forecast())
    }
}
