//
//  AppInitializer.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class AppInitializer {
    
    @LazyInjected private var authService: IAuthService
    @LazyInjected private var sportsService: ISportService
    @LazyInjected private var userService: IUserService
    
    private let coordinator: AppCoordinator

    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
    }
    
    func start(with window: UIWindow) {
        stayOnLaunch(window: window)

        if let _ = self.authService.isAuthorized {
            initForUnauthorized(window: window)
        } else {
            initForAuthorized(window: window)
        }
    }
    
    private func initForAuthorized(window: UIWindow) {
        let group = initialConfiguration(authorized: true)
        group.notify(queue: .main) {
            let vc = self.coordinator.mainTabBarScreen
            self.coordinator.mainTabBar.setState(isAuthorized: true)
            self.proceed(window: window, vc: vc)
        }
    }
    
    private func initForUnauthorized(window: UIWindow) {
        let group = initialConfiguration(authorized: false)
        group.notify(queue: .main) {
            let vc = self.coordinator.mainTabBarScreen
            self.coordinator.mainTabBar.setState(isAuthorized: false)
            self.proceed(window: window, vc: vc)
        }
    }
    
    private func initialConfiguration(authorized: Bool) -> DispatchGroup {
        let group = DispatchGroup()
        group.enter()
        sportsService.updateKnownSports {
            group.leave()
        }
        
        if authorized {
            group.enter()
            userService.reloadInfo { (err) in
                if let err = err {
                    print(err.localizedDescription)
                    return
                }
                
                group.leave()
            }
        }
        
        return group
    }
    
    private func stayOnLaunch(window: UIWindow) {
        window.rootViewController = UIStoryboard(name: "LaunchScreen", bundle: nil).instantiateInitialViewController()
        window.makeKeyAndVisible()
    }
    
    private func proceed(window: UIWindow, vc: UIViewController) {
        window.rootViewController = vc
        window.makeKeyAndVisible()
    }
}
