//
//  MainScreenInteractor.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IMainScreenInteractor: class {
    
    func getForecasts(callback: @escaping ([Forecast])->Void)
    func getForecasters(callback: @escaping ([Forecaster])->Void)
}

class MainScreenInteractor: IMainScreenInteractor {
    
    @LazyInjected private var forecastService: IForecastService
    @LazyInjected private var forecasterService: IForecasterService
    
    func getForecasts(callback: @escaping ([Forecast])->Void) {
        forecastService.getForecasts(count: 5, page: 1,
                                     sport: .all, timeFrame: .all,
                                     subscribers: false)
        { (result) in
            switch result {
            case .success(let forecasts):
                callback(forecasts)
                
            case .failure(let error):
                print("error loading main forecasts: \(error.localizedDescription)")
            }
        }
    }
    
    func getForecasters(callback: @escaping ([Forecaster]) -> Void) {
        forecasterService.topForecasters(count: 15)
        { (result) in
            switch result {
            case .success(let forecasters):
                callback(forecasters)
                
            case .failure(let err):
                print("error loading main top forecasters: \(err.localizedDescription)")
            }
        }
    }
}
