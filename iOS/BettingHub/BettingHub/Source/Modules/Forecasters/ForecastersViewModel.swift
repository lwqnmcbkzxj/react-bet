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

class ForecastersViewModel: TableViewModelImplementation<Forecaster, ForecastersViewModelState> {
    
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
    
    private func fetchMore() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            self.items += (0..<self.pageSize).map { _ in .stub() }
            self.isLoading = false
        }
    }
}
