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
    
    var sport: Sport = .all
    
    var timeFrame: TimeFrame = .all
    
    var forecastFilter: ForecastFilter = .all {
        didSet {
            forecastsFilterChanged(old: oldValue, new: forecastFilter)
        }
    }
    
    //Binds
    var dataChanged: (()->Void)?
    
    var loadingStatusChanged: ((Bool)->Void)?
    
    private let forecastService: IForecastService
    
    init(forecastService: IForecastService) {
        self.forecastService = forecastService
    }
    
    //Info
    
    var loadedPages: Int {
        let fullPages = forecasts.count / pageSize
        let isLastPage = forecasts.count % pageSize > 0
        return fullPages + (isLastPage ? 1 : 0)
    }
    
    func numberOfRows() -> Int {
        return forecasts.count
    }
    
    func forecast(at indexPath: IndexPath) -> Forecast {
        return forecasts[indexPath.row]
    }
    
    //Private
    
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
    
    private func forecastsFilterChanged(old: ForecastFilter, new: ForecastFilter) {
        //TODO: implement when ready on beckend. Do nothing now.
//        switch old {
//        case .all, .paid:
//            if new != .subscribers { break }
//            forecasts = []
//            fetchMore()
//        case .subscribers:
//            if new != .subscribers {
//                forecasts = []
//                fetchMore()
//            }
//        }
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
