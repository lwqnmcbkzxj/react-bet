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
}

class MainTabBarController: UITabBarController {
    
    init(coordinator: AppCoordinator) {
        super.init(nibName: nil, bundle: nil)
        
        setupScreens(coordinator: coordinator)
        selectedIndex = 0
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupScreens(coordinator: AppCoordinator) {
        
        let mainScreen = coordinator.mainScreen()
        mainScreen.tabBarItem = UITabBarItem(title: nil,
                                             image: UIImage(named: "homeIcon")!.withRenderingMode(.alwaysOriginal),
                                             selectedImage: UIImage(named: "homeIconSelected")!.withRenderingMode(.alwaysOriginal))
        
        let forecastsScreen = coordinator.forecastsScreen()
        forecastsScreen.tabBarItem = UITabBarItem(title: nil,
                                                  image: UIImage(named: "forecastsIcon")!.withRenderingMode(.alwaysOriginal),
                                                  selectedImage: UIImage(named: "forecastsIconSelected")!.withRenderingMode(.alwaysOriginal))
        
        setViewControllers([mainScreen, forecastsScreen], animated: false)
    }
}

extension MainTabBarController: IMainTabBar {
    
    func show(screen: MainTabBarScreen) {
        switch screen {
        case .main:
            selectedIndex = 0
        case .forecasts:
            selectedIndex = 1
        default:
            break
        }
    }
}
