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
//        switch authService.isAuthorized {
//        case .success(let auth):
//            if auth {
//                //TODO: change when exit added
////                window.rootViewController = coordinator.mainTabBarScreen
//                window.rootViewController = coordinator.loginVC()
//            } else {
//                window.rootViewController = coordinator.loginVC()
//            }
//        case .failure(_):
//            window.rootViewController = coordinator.loginVC()
//        }
        window.rootViewController = coordinator.mainTabBarScreen
        window.makeKeyAndVisible()
    }
}
