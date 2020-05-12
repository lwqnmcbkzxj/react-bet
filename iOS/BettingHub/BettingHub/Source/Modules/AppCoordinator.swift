//
//  ModulesCreator.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class AppCoordinator {
    
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
        let interactor = MainScreenInteractor(forecastService: ServiceLocator.shared.forecastService)
        let dataProvider = MainScreenDataProvider(interactor: interactor)
        vc.dataProvider = dataProvider
        vc.router = router
        router.viewController = vc
        let nav = NavigationController(rootViewController: vc)
        return nav
    }
    
    func forecastsScreen() -> UIViewController {
        let vm = ForecastsViewModel(forecastService: ServiceLocator.shared.forecastService)
        let vc = ForecastsViewController(viewModel: vm)
        let router = ForecastsRouter(coordinator: self)
        vc.router = router
        router.viewController = vc
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
        let router = FullForecasterRouter(viewController: vc, coordinator: self)
        vc.router = router
        vc.configure(with: forecast)
        return vc
    }
    
    func menuScreen() -> UIViewController {
        let vc = MenuViewController(coordinator: self)
        let nav = NavigationController(rootViewController: vc)
        return nav
    }
    
    func bookmakersScreen() -> UIViewController {
        let vc = BookmakersViewController()
        let vm = BookmakersViewModel()
        vc.viewModel = vm
        return vc
    }
    
    func matchesScreen() -> UIViewController {
        let vc = MatchesViewController()
        let vm = MatchesViewModel()
        vc.viewModel = vm
        return vc
    }
    
    func forecastersScreen() -> UIViewController {
        let vc = ForecastersViewController()
        let vm = ForecastersViewModel()
        vc.viewModel = vm
        return vc
    }
    
    func selfProfile() -> UIViewController {
        let vc = ProfileAssembly().module(coordinator: self, isSelf: true)
        let nav = NavigationController(rootViewController: vc)
        return nav
    }
    
    func guestProfile() -> UIViewController {
        let vc = ProfileAssembly().module(coordinator: self, isSelf: false)
        return vc
    }
    
    func settingsScreen() -> UIViewController {
        let vc = SettingsViewController()
        let presenter = SettingsPresenter(authService: ServiceLocator.shared.authService)
        let router = SettingsRouter()
        vc.presenter = presenter
        presenter.router = router
        router.viewController = vc
        router.coordinator = self
        return vc
    }
}
