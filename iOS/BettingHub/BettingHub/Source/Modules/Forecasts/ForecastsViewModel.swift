//
//  ForecastsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecastsViewModel {
    
    let pageSize: Int = 10
    
    //Options
    var currentPage: Int = 0 {
        didSet {
            if currentPage > loadedPages,
                !isLoading {
                fetchMore()
            }
        }
    }
    
    var sport: Sport = .all {
        didSet { filtersChanged() }
    }
    
    var timeFrame: TimeFrame = .all {
        didSet { filtersChanged() }
    }
    
    var forecastFilter: ForecastFilter = .all {
        didSet {
            filtersChanged()
        }
    }
    
    //Binds
    var dataChanged: (()->Void)?
    
    var loadingStatusChanged: ((Bool)->Void)?
    
    
    //Info
    
    var loadedPages: Int {
        let fullPages = numberOfRows() / pageSize
        let lastIsIncomplete = (numberOfRows() % pageSize) > 0
        return fullPages + (lastIsIncomplete ? 1 : 0)
    }
    
    func numberOfRows() -> Int {
        return forecasts.count
    }
    
    func forecast(at indexPath: IndexPath) -> Forecast {
        return forecasts[indexPath.row]
    }
    
    func reload() {
        self.forecasts = []
        currentPage = 1
    }
    
    //Private
    
    @LazyInjected private var forecastService: IForecastService
    
    private var isLoading: Bool = false {
        didSet {
            loadingStatusChanged?(isLoading)
        }
    }
    
    private var forecasts: [Forecast] = [] {
        didSet {
            dataChanged?()
        }
    }
    
    private func filtersChanged() {
        forecasts = []
        fetchMore()
    }
    
    private func fetchMore() {
        isLoading = true
        forecastService.getForecasts(count: pageSize, page: loadedPages + 1,
                                     sport: sport, timeFrame: timeFrame,
                                     subscribers: forecastFilter == .subscribers)
        { (result) in
            switch result {
            case .success(let forecasts):
                self.forecasts += forecasts
            case .failure(let error):
                print("error loading: \(error.localizedDescription)") //TODO: show alert
            }
            self.isLoading = false
        }
    }
}
