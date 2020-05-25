//
//  Router.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 24.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IMainScreenRouter: class {
    
    func showForecasters()
    
    func showForecaster(_ forecaster: Forecaster)
    
    func showForecastsListScreen()
    
    func showFullForecastScreen(_ forecast: Forecast)
    
    func showBookmakersListScreen()
    
    func showBookmaker(_ bookmaker: Bookmaker)
    
    func showMatchesListScreen()
    
    func showMatchScreen(_ match: Match)
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
    
    func showForecasters() {
        let vc = coordinator.forecastersScreen()
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showForecaster(_ forecaster: Forecaster) {
        let vc = coordinator.profile(forecaster: forecaster)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showBookmaker(_ bookmaker: Bookmaker) {
        let vc = coordinator.bookmakerScreen(bookmaker)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showMatchScreen(_ match: Match) {
        let vc = coordinator.matchScreen(match)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
