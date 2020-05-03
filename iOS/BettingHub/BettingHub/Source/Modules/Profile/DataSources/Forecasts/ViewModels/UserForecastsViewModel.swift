//
//  UserForecastsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserForecastsViewModel: TableViewModelImplementation<Forecast, Any> {
    
    override var pageSize: Int { return 5 }
    
    override func currentPage(_ page: Int) {
        if page > loadedPages && !isLoading {
            fetchMore()
        }
    }
    
    private func fetchMore() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            let forecasts = (0..<10).map { _ in Forecast.stub() }
            self.items += forecasts
            self.isLoading = false 
        }
    }
}
