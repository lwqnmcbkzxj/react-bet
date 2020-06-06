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
    func getMatches(callBack: @escaping ([Match])->Void)
    func getBookmakers(callback: @escaping ([Bookmaker])->Void)
}

class MainScreenInteractor: IMainScreenInteractor {
    
    @LazyInjected private var forecastService: IForecastService
    @LazyInjected private var forecasterService: IForecasterService
    @LazyInjected private var matchService: IMatchService
    @LazyInjected private var bookmakerService: IBookmakerService
    
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
        forecasterService.topForecasters(page: 1, count: 15, sport: .all, time: .month)
        { (result) in
            switch result {
            case .success(let forecasters):
                callback(forecasters)
                
            case .failure(let err):
                print("error loading main top forecasters: \(err.localizedDescription)")
            }
        }
    }
    
    func getMatches(callBack: @escaping ([Match]) -> Void) {
        matchService.matches(page: 1, count: 5) { (result) in
            switch result {
            case .success(let matches):
                callBack(matches)
            case .failure(let err):
                print("error loading main matches: \(err.localizedDescription)")
            }
        }
    }
    
    func getBookmakers(callback: @escaping ([Bookmaker]) -> Void) {
        bookmakerService.bookmakers { (result) in
            switch result {
            case .success(let bookmakers):
                if bookmakers.count > 3 {
                    callback(bookmakers[0..<3].map {$0})
                    return
                }
                callback(bookmakers)
            case .failure(let err):
                print("error loading main bookmakers: \(err.localizedDescription)")
            }
        }
    }
}
