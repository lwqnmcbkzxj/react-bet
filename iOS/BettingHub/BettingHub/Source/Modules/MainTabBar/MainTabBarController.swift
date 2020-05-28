//
//  MainTabBarController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

enum MainTabBarScreen {
    case main, forecasts, add, profile, options
}

protocol IMainTabBar: class {
    
    func show(screen: MainTabBarScreen)
    
    func toRoot(vc: UIViewController)
    
    func setState(isAuthorized authorized: Bool)
}

class MainTabBarController: UITabBarController {
    
    private weak var coordinator: AppCoordinator?
    
    init(coordinator: AppCoordinator) {
        super.init(nibName: nil, bundle: nil)
        tabBar.itemPositioning = .centered
        self.coordinator = coordinator
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupScreens(coordinator: AppCoordinator, authorized: Bool) {
        
        let mainScreen = coordinator.mainScreen()
        let mainImage = UIImage(named: "homeIcon")!.withRenderingMode(.alwaysOriginal)
        let mainImageSel = UIImage(named: "homeIconSelected")!.withRenderingMode(.alwaysOriginal)
        mainScreen.tabBarItem = item(image: mainImage, selectedImage: mainImageSel)
        
        let forecastsScreen = coordinator.forecastsScreen()
        let forecastsImage = UIImage(named: "forecastsIcon")!.withRenderingMode(.alwaysOriginal)
        let forecastsImageSel = UIImage(named: "forecastsIconSelected")!.withRenderingMode(.alwaysOriginal)
        forecastsScreen.tabBarItem = item(image: forecastsImage, selectedImage: forecastsImageSel)
        
        let createScreen = coordinator.createForecastScreen()
        createScreen.view.backgroundColor = .white
        let createImage = UIImage(named: "plusTabBar")!.withRenderingMode(.alwaysOriginal)
        let createImageSel = UIImage(named: "plusTabBarSelected")!.withRenderingMode(.alwaysOriginal)
        createScreen.tabBarItem = item(image: createImage, selectedImage: createImageSel)
        
        let profileScreen = profileTabScreen(isAuthorized: authorized, coordinator: coordinator)
        
        let menuScreen = coordinator.menuScreen()
        let menuImage = UIImage(named: "menuTabBar")!.withRenderingMode(.alwaysOriginal)
        let menuImageSel = UIImage(named: "menuTabBarSelected")!.withRenderingMode(.alwaysOriginal)
        menuScreen.tabBarItem = item(image: menuImage, selectedImage: menuImageSel)
        
        setViewControllers([mainScreen, forecastsScreen, createScreen, profileScreen, menuScreen],
                           animated: false)
    }
    
    private func item(image: UIImage, selectedImage: UIImage) -> UITabBarItem {
        let item = UITabBarItem(title: nil,
                                image: image,
                                selectedImage: selectedImage)
        item.imageInsets = .init(top: 4, left: 0, bottom: -4, right: 0)
        return item
    }
    
    private func profileTabScreen(isAuthorized authorized: Bool,
                                  coordinator: AppCoordinator) -> UIViewController {
        if authorized {
            let vc = coordinator.profile(forecaster: nil)
            let profileScreen = coordinator.embedInNavigation(vc: vc)
            profileScreen.view.backgroundColor = .white
            let profileImage = UIImage(named: "profileTabBar")!.withRenderingMode(.alwaysOriginal)
            let profileImageSel = UIImage(named: "profileTabBarSelected")!.withRenderingMode(.alwaysOriginal)
            profileScreen.tabBarItem = item(image: profileImage, selectedImage: profileImageSel)
            return profileScreen
        } else {
            let profileScreen = coordinator.loginVC()
            profileScreen.view.backgroundColor = .white
            let profileImage = UIImage(named: "profileTabBar")!.withRenderingMode(.alwaysOriginal)
            let profileImageSel = UIImage(named: "profileTabBarSelected")!.withRenderingMode(.alwaysOriginal)
            profileScreen.tabBarItem = item(image: profileImage, selectedImage: profileImageSel)
            return profileScreen
        }
    }
}

extension MainTabBarController: IMainTabBar {
    
    func show(screen: MainTabBarScreen) {
        selectedIndex =
        [
            .main: 0,
            .forecasts: 1,
            .add: 2,
            .profile: 3,
            .options: 4
        ][screen]!
    }
    
    func toRoot(vc: UIViewController) {
        vc.navigationController?.popToRootViewController(animated: true)
    }
    
    func setState(isAuthorized authorized: Bool) {
        guard let coordinator = coordinator else { return }
        setupScreens(coordinator: coordinator, authorized: authorized)
    }
}
