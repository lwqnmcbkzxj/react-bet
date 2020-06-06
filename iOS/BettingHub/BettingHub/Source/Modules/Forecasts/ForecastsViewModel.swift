//
//  ForecastsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ForecastsViewModelState {
    let sport: Sport
    let timeFrame: TimeFrame
    let filter: ForecastFilter
    
    static var `default`: ForecastsViewModelState {
        return .init(sport: .all, timeFrame: .all, filter: .all)
    }
}

class ForecastsViewModel: TableViewModel<Forecast, ForecastsViewModelState> {
    
    @LazyInjected
    private var forecastService: IForecastService
    
    override var pageSize: Int { 10 }
    
    override func currentPage(_ page: Int) {
        if !isLoading && page > loadedPages {
            fetchMore()
        }
    }
    
    override func stateChanged() {
        reload()
    }
    
    private func fetchMore() {
        isLoading = true
        let sport = state?.sport ?? .all
        let timeFrame = state?.timeFrame ?? .all
        let filter = state?.filter ?? .all
        forecastService.getForecasts(count: pageSize, page: loadedPages + 1,
                                     sport: sport,
                                     timeFrame: timeFrame,
                                     subscribers: filter == .subscribers)
        { (result) in
            switch result {
            case .success(let forecasts):
                self.items += forecasts
            case .failure(let error):
                print("error loading: \(error.localizedDescription)") //TODO: show alert
            }
            self.isLoading = false
        }
    }
}
