//
//  ProfileStatisticsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ProfileStatisticsViewModel: TableViewModel<Forecaster, Any> {
    
    private var interactor: IProfileInteractor
    
    init(interactor: IProfileInteractor) {
        self.interactor = interactor
    }
    
    override var pageSize: Int { 1 }
    
    override func currentPage(_ page: Int) {
        if loadedPages < page, !isLoading {
            fetchStats()
        }
    }
    
    private func fetchStats() {
        isLoading = true
        self.items = [self.interactor.profile()]
        self.isLoading = false
    }
}
