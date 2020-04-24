//
//  ForecastsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecastsViewModel {
    
    var dataChanged: (()->Void)?
    
    var loadingStatusChanged: ((Bool)->Void)?
    
    func numberOfRows() -> Int {
        return forecasts.count
    }
    
    func forecast(at indexPath: IndexPath) -> Forecast {
        return forecasts[indexPath.row]
    }
    
    func fetch() {
        isLoading = true
        Timer.scheduledTimer(withTimeInterval: 2, repeats: false) { (_) in
            self.forecasts = (0..<10).map { _ in Forecast.stub() }
            self.isLoading = false
        }
    }
    
    private var isLoading: Bool = false {
        didSet {
            loadingStatusChanged?(isLoading)
        }
    }
    
    private var forecasts: [Forecast] = [] {
        didSet {
            dataChanged?()
        }
    }
}
