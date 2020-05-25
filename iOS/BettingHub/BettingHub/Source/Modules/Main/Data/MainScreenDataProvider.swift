//
//  MainScreenDataProvider.swift
//  
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//

import Foundation

class MainScreenDataProvider {
    
    let interactor: IMainScreenInteractor
    
    init(interactor: IMainScreenInteractor) {
        self.interactor = interactor
    }
    
    private var forecasters: [Forecaster] = [] {
        didSet {
            DispatchQueue.main.async {
                self.forecastersChanged?()
            }
        }
    }
    
    var forecastersChanged: (()->Void)?
    
    func numberOfForecasters() -> Int { forecasters.count }
    
    func dataForForecaster(index: Int) -> Forecaster {
        return forecasters[index]
    }
    
    
    
    private var bookmakers: [Bookmaker] = [] {
        didSet {
            DispatchQueue.main.async {
                self.bookmakersChanged?()
            }
        }
    }
    
    var bookmakersChanged: (() -> Void)?
    
    func numberOfBookmakers() -> Int { bookmakers.count }
    
    func dataForBookmaker(row: Int) -> Bookmaker {
        return bookmakers[row]
    }
    
    
    
    private var matches: [Match] = [] {
        didSet {
            DispatchQueue.main.async {
                self.matchesChanged?()
            }
        }
    }
    
    var matchesChanged: (()->Void)?
    
    func numberOfMatches() -> Int { matches.count }
    
    func dataForMatch(row: Int) -> Match {
        return matches[row]
    }
    
    
    
    private var forecasts: [Forecast] = [] {
        didSet {
            DispatchQueue.main.async {
                self.forecastsChanged?()
            }
        }
    }
    
    var forecastsChanged: (()->Void)?
    
    func numberOfForecasts() -> Int { forecasts.count }
    
    func dataForForecast(row: Int) -> Forecast {
        return forecasts[row]
    }
    
    func getData() {
        self.interactor.getForecasters { (forecasters) in
            self.forecasters = forecasters
        }
        
        self.interactor.getBookmakers { [weak self] (bookmakers) in
            self?.bookmakers = bookmakers
        }
        
        self.interactor.getMatches { [weak self] (matches) in
            self?.matches = matches
        }
        
        self.interactor.getForecasts { [weak self] (forecasts) in
            self?.forecasts = forecasts
        }
    }
}
