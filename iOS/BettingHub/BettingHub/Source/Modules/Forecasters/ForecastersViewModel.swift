//
//  ForecastersViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ForecastersViewModelState {
    let timeFrame: TimeFrame
    let sport: Sport
}

class ForecastersViewModel: TableViewModel<Forecaster, ForecastersViewModelState> {
    
    override var pageSize: Int { return 15 }
    
    override func currentPage(_ page: Int) {
        if page > loadedPages && !isLoading  {
            fetchMore()
        }
    }
    
    override func stateChanged() {
        items = []
        fetchMore()
    }
    
    @LazyInjected
    private var forecasterService: IForecasterService
    
    private func fetchMore() {
        isLoading = true
        forecasterService.topForecasters(page: loadedPages + 1,
                                         count: pageSize)
        { (result) in
            switch result {
            case .success(let forecasters):
                self.items += forecasters

            case .failure(let err):
                print(err.localizedDescription)
            }

            self.isLoading = false
        }
    }
}
