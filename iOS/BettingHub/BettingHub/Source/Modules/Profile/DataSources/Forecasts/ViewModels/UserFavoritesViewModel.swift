//
//  UserFavoritesViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserFavoritesViewModel: TableViewModel<Forecast, Any> {
    
    override var pageSize: Int { return 5 }
    
    override func currentPage(_ page: Int) {
        if page > loadedPages && !isLoading {
            fetchMore()
        }
    }
    
    @LazyInjected
    private var forecastService: IForecastService
    
    private func fetchMore() {
        isLoading = true
        
        forecastService.getFavorites(count: 10,
                                     page: loadedPages + 1)
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
