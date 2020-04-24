//
//  ModulesCreator.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class AppCoordinator {
    
    static let main: AppCoordinator = AppCoordinator()
    
    var mainTabBar: IMainTabBar {
        return mainTabBarScreen as! IMainTabBar
    }
    
    private(set) lazy var mainTabBarScreen: UIViewController = {
        let tabBar = MainTabBarController(coordinator: self)
        tabBar.modalPresentationStyle = .fullScreen
        return tabBar
    }()
    
    func mainScreen() -> UIViewController {
        let vc = MainViewController()
        let router = MainScreenRouter(coordinator: self)
        vc.router = router
        router.viewController = vc
        let nav = NavigationController(rootViewController: vc)
        return nav
    }
    
    func forecastsScreen() -> UIViewController {
        let vc = ForecastsViewController()
        let nav = NavigationController(rootViewController: vc)
        return nav
    }
    
    func loginVC() -> UIViewController {
        let presenter = LoginPresenter(authService: ServiceLocator.shared.authService)
        let vc = LoginViewController()
        let router = LoginRouter(coordinator: self)
        vc.presenter = presenter
        presenter.vc = vc
        presenter.router = router
        router.viewController = vc
        return vc
    }
    
    func fullForecastScreen(forecast: Forecast) -> UIViewController {
        let vc = FullForecastViewController()
        return vc
    }
}
