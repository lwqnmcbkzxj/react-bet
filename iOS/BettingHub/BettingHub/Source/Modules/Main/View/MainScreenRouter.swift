//
//  Router.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IMainScreenRouter: class {
    
    func showFullForecastScreen(_ forecast: Forecast)
    
    func showForecastsListScreen()
    
    func showBookmakersListScreen()
    
    func showMatchesListScreen()
}


class MainScreenRouter: IMainScreenRouter {
    
    weak var viewController: UIViewController!
    
    let coordinator: AppCoordinator
    
    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
    }
    
    func showFullForecastScreen(_ forecast: Forecast) {
        let vc = coordinator.fullForecastScreen(forecast: forecast)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showForecastsListScreen() {
        coordinator.mainTabBar.show(screen: .forecasts)
    }
    
    func showBookmakersListScreen() {
        let vc = coordinator.bookmakersScreen()
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showMatchesListScreen() {
        let vc = coordinator.matchesScreen()
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
