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
    
    func embedInNavigation(vc: UIViewController) -> UINavigationController {
        return NavigationController(rootViewController: vc)
    }
    
    func mainScreen() -> UIViewController {
        let vc = MainViewController()
        let router = MainScreenRouter(coordinator: self)
        let interactor = MainScreenInteractor()
        let dataProvider = MainScreenDataProvider(interactor: interactor)
        vc.dataProvider = dataProvider
        vc.router = router
        router.viewController = vc
        let nav = NavigationController(rootViewController: vc)
        
        mainTabBar.addDelegate(vc)
        
        return nav
    }
    
    func forecastsScreen() -> UIViewController {
        let vm = ForecastsViewModel()
        let vc = ForecastsViewController(viewModel: vm)
        let router = ForecastsRouter(coordinator: self)
        vc.router = router
        router.viewController = vc
        let nav = NavigationController(rootViewController: vc)
        
        mainTabBar.addDelegate(vc)
        
        return nav
    }
    
    func loginVC() -> UIViewController {
        let presenter = LoginPresenter()
        let vc = LoginViewController()
        let router = LoginRouter(coordinator: self)
        vc.presenter = presenter
        presenter.vc = vc
        presenter.router = router
        router.viewController = vc
        return vc
    }
    
    func fullForecastScreen(forecast: Forecast) -> UIViewController {
        let assembly = FullForecastAssembly()
        let vc = assembly.module(forecast: forecast, coordinator: self)
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
        let router = BookmakersRouter()
        router.viewController = vc
        router.coordinator = self
        vc.viewModel = vm
        vc.router = router
        return vc
    }
    
    func matchesScreen() -> UIViewController {
        let vc = MatchesViewController()
        let router = MatchesRouter()
        let vm = MatchesViewModel()
        
        vc.viewModel = vm
        vc.router = router
        
        router.coordinator = self
        router.viewController = vc
        
        return vc
    }
    
    func forecastersScreen() -> UIViewController {
        let vc = ForecastersViewController()
        let router = ForecastersRouter()
        let vm = ForecastersViewModel()
        
        vc.viewModel = vm
        vc.router = router
        
        router.coordinator = self
        router.viewController = vc
        
        return vc
    }
    
    func profile(forecaster: Forecaster?) -> UIViewController {
        let vc = ProfileAssembly().module(coordinator: self, forecaster: forecaster)
        return vc
    }
    
    func settingsScreen(userInfo: UserInfo) -> UIViewController {
        let vc = SettingsViewController()
        let presenter = SettingsPresenter()
        let router = SettingsRouter()
        vc.presenter = presenter
        presenter.router = router
        router.viewController = vc
        router.coordinator = self
        
//        vc.configure(userInfo: userInfo)
        return vc
    }
    
    func bookmakerScreen(_ bookmaker: Bookmaker) -> UIViewController {
        let vc = BookmakerViewController()
        let vm = BookmakerViewModel(bookmaker: bookmaker)
        vc.vm = vm
        vc.configure(with: bookmaker)
        return vc
    }
    
    func matchScreen(_ match: Match) -> UIViewController {
        let assembly = MatchAssembly()
        let vc = assembly.module(match: match)
        return vc
    }
    
    func policyScreen() -> UIViewController {
        let vc = PolicyViewController()
        let presenter = PolicyPresenter()
        vc.presenter = presenter
        return vc
    }
    
    func articlesListScreen() -> UIViewController {
        let vc = ArticlesListViewController()
        let router = ArticlesListRouter()
        router.coordinator = self
        router.viewController = vc
        vc.router = router
        return vc
    }
    
    func fullArticleScreen(article: Article) -> UIViewController {
        let vc = FullArticleViewController()
        let vm = FullArticleViewModel(article: article)
        let router = FullArticleRouter()
        router.coordinator = self
        router.viewController = vc
        vc.router = router
        vc.vm = vm
        return vc
    }
    
    func newsListScreen() -> UIViewController {
        let vc = NewsViewController()
        return vc
    }
    
    func addForecastScreenBlock() -> UIViewController {
        return AddForecastViewController()
    }
    
    func createForecastScreen() -> UIViewController {
        let assembly = CreateForecastAssembly.shared
        let vc = assembly.screen()
        return vc
    }
    
    func respondScreen(comment: Comment?, ref: CommentType, id: Int) -> UIViewController {
        let presenter = RespondPresenter(comment: comment, ref: ref, id: id)
        let vc = RespondViewController()
        vc.presenter = presenter
        return vc
    }
}
