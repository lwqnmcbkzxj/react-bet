//
//  IForecastService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IForecastService: class {
    
    func getForecasts(count: Int, page: Int,
                      sport: Sport, timeFrame: TimeFrame,
                      subscribers: Bool,
                      callback: ((Result<[Forecast], BHError>)->Void)?)
    
    //TODO: Implement with profile
//    func getFavorites(count: Int,
//                      page: Int,
//                      sport: Sport,
//                      timeFrame: TimeFrame,
//                      callback: ((Result<[Forecast], BHError>)->Void)?)
    
    func getForecast(id: Int, callback: ((Result<Forecast, BHError>)->Void)?)
}
