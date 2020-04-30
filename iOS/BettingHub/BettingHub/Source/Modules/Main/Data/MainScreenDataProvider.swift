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
        DispatchQueue.global(qos: .background).asyncAfter(deadline: .now() + 0) {
            self.forecasters = (0..<15).map { (_) -> Forecaster in
                .stub()
            }
            
            self.bookmakers = (0..<3).map({ (_) -> Bookmaker in
                Bookmaker(image: nil, rating: 9.40, bonus: 3000)
            })

            self.matches = (0..<5).map { (_) -> Match in
                Match(date: Date(),
                      sport: .football,
                      name: "Mousesports - Virtus.pro",
                      season: "LPL Pro League Season 4",
                      bets: 122)
            }
            
            self.interactor.getForecasts { [weak self] (forecasts) in
                self?.forecasts = forecasts
            }
        }
    }
}
