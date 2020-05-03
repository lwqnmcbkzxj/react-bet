//
//  ProfileStatisticsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ProfileStatisticsViewModel: TableViewModelImplementation<Forecaster, Any> {
    
    override var pageSize: Int { 1 }
    
    override func currentPage(_ page: Int) {
        if loadedPages < page, !isLoading {
            fetchStats()
        }
    }
    
    private func fetchStats() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.items = [Forecaster.stub()]
            self.isLoading = false
        }
    }
}
