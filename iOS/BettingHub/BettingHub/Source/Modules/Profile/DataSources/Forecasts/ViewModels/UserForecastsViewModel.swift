//
//  UserForecastsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserForecastsViewModel: TableViewModel<Forecast, Any> {
    
    override var pageSize: Int { return 5 }
    
    override func currentPage(_ page: Int) {
        if page > loadedPages && !isLoading {
            fetchMore()
        }
    }
    
    @LazyInjected
    private var forecastService: IForecastService
    
    @LazyInjected
    private var userService: IUserService
    
    private func fetchMore() {
        isLoading = true
        
        forecastService.userForecasts(id: userService.currentUserInfo?.forecaster.id ?? 0,
                                  page: loadedPages + 1,
                                  count: 10)
        { (result) in
            switch result {
            case .success(let forecasts):
                self.items += forecasts
                
            case .failure(let err):
                print(err.localizedDescription)
            }
            
            self.isLoading = false
        }
    }
}
