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
        let mainImage = UIImage(named: "homeIcon")!.withRenderingMode(.alwaysOriginal)
        let mainImageSel = UIImage(named: "homeIconSelected")!.withRenderingMode(.alwaysOriginal)
        mainScreen.tabBarItem = UITabBarItem(title: nil,
                                             image: mainImage,
                                             selectedImage: mainImageSel)
        
        let forecastsScreen = coordinator.forecastsScreen()
        let forecastsImage = UIImage(named: "forecastsIcon")!.withRenderingMode(.alwaysOriginal)
        let forecastsImageSel = UIImage(named: "forecastsIconSelected")!.withRenderingMode(.alwaysOriginal)
        forecastsScreen.tabBarItem = UITabBarItem(title: nil,
                                                  image: forecastsImage,
                                                  selectedImage: forecastsImageSel)
        
        let createScreen = UIViewController()
        createScreen.view.backgroundColor = .white
        let createImage = UIImage(named: "plusTabBar")!.withRenderingMode(.alwaysOriginal)
        let createImageSel = UIImage(named: "plusTabBarSelected")!.withRenderingMode(.alwaysOriginal)
        createScreen.tabBarItem = UITabBarItem(title: nil ,
                                               image: createImage,
                                               selectedImage: createImageSel)
        
        let profileScreen = UIViewController()
        profileScreen.view.backgroundColor = .white
        let profileImage = UIImage(named: "profileTabBar")!.withRenderingMode(.alwaysOriginal)
        let profileImageSel = UIImage(named: "profileTabBarSelected")!.withRenderingMode(.alwaysOriginal)
        profileScreen.tabBarItem = UITabBarItem(title: nil,
                                                image: profileImage,
                                                selectedImage: profileImageSel)
        
        let menuScreen = coordinator.menuScreen()
        let menuImage = UIImage(named: "menuTabBar")!.withRenderingMode(.alwaysOriginal)
        let menuImageSel = UIImage(named: "menuTabBarSelected")!.withRenderingMode(.alwaysOriginal)
        menuScreen.tabBarItem = UITabBarItem(title: nil,
                                             image: menuImage,
                                             selectedImage: menuImageSel)
        
        setViewControllers([mainScreen, forecastsScreen, createScreen, profileScreen, menuScreen],
                           animated: false)
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
