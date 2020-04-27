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
}

class MainScreenInteractor: IMainScreenInteractor {
    
    private let forecastService: IForecastService
    
    init(forecastService: IForecastService) {
        self.forecastService = forecastService
    }
    
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
}
