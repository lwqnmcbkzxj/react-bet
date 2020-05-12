//
//  AppInitializer.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class AppInitializer {
    
    private let authService: IAuthService
    private let coordinator: AppCoordinator
    
    init(coordinator: AppCoordinator, authService: IAuthService) {
        self.authService = authService
        self.coordinator = coordinator
    }
    
    func start(with window: UIWindow) {
        let vc = coordinator.mainTabBarScreen
        window.rootViewController = vc
        window.makeKeyAndVisible()
        
        if let authErr = authService.isAuthorized {
            coordinator.mainTabBar.setState(isAuthorized: false)
        } else {
            coordinator.mainTabBar.setState(isAuthorized: true)
        }
    }
}
