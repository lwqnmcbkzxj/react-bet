//
//  UserForecastsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserForecastsViewModel: TableViewModel<Forecast, Any> {
    
    let interactor: IProfileInteractor
    
    init(interactor: IProfileInteractor) {
        self.interactor = interactor
    }
    
    override var pageSize: Int { return 10 }
    
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
        
        forecastService.userForecasts(id: interactor.profile().id,
                                  page: loadedPages + 1,
                                  count: pageSize)
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
