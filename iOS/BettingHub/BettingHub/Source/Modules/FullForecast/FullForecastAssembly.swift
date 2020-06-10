//
//  FullForecastAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullForecastAssembly {
    
    func module(forecast: Forecast, coordinator: AppCoordinator) -> UIViewController {
        let vc = FullForecastViewController()
        let router = FullForecastRouter(viewController: vc, coordinator: coordinator)
        vc.router = router
        
        let header = FullForecastHeader(forecast: forecast)
        let headerPresenter = FullForecastHeaderPresenter(forecast: forecast, router: router)
        header.presenter = headerPresenter
        let headerSection = FullForecastHeaderSection(header: header)
        
        let comments = CommentsViewModel(tableView: vc.tableView,
                                         sectionNumber: 1,
                                         type: .forecasts,
                                         id: forecast.id,
                                         router: router)
        
        vc.setSections([headerSection, comments])
        
        return vc
    }
}
