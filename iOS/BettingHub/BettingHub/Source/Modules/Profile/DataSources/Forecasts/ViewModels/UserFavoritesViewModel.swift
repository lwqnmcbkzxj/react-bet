//
//  UserFavoritesViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserFavoritesViewModel: TableViewModel<Forecast, Any> {
    
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
    
    private func fetchMore() {
        isLoading = true
        
        forecastService.bookmarks(page: loadedPages + 1,
                                  limit: pageSize)
        { (result) in
            result.onSuccess { self.items += $0 }
                  .onFailure { print($0.localizedDescription) }
            self.isLoading = false
        }
    }
}
