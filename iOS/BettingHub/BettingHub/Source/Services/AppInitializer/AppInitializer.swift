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
    
    private let window: UIWindow
    private let coordinator: AppCoordinator

    init(coordinator: AppCoordinator, window: UIWindow) {
        self.coordinator = coordinator
        self.window = window
    }
    
    func start() {
        stayOnLaunch()
        
        let authErr = authService.isAuthorized
        
        if authErr == nil { //authorized
            initialConfiguration(authorized: true)
        } else {
            initialConfiguration(authorized: false)
        }
    }
    
    private func initialConfiguration(authorized: Bool) {
        let group =  DispatchGroup()
        var successfullyGotUserData = !authorized
        
        group.enter()
        sportsService.updateKnownSports {
            group.leave()
        }
        
        if authorized {
            group.enter()
            userService.reloadInfo { (err) in
                if let err = err {
                    print("UserInfo: " + err.localizedDescription)
                    
                    if let _ = self.userService.currentUserInfo {
                        successfullyGotUserData = true
                    }
                    
                } else {
                    successfullyGotUserData = true
                }
                
                group.leave()
            }
        }
        
        group.notify(queue: .global(qos: .background)) {
            if !authorized { self.proceed(authorized: false) }
            
            self.proceed(authorized: successfullyGotUserData)
        }
    }
    
    private func stayOnLaunch() {
        let vc = UIStoryboard(name: "LaunchScreen",
                              bundle: nil).instantiateInitialViewController()
        window.rootViewController = vc
        window.makeKeyAndVisible()
    }
    
    private func proceed(authorized: Bool) {
        DispatchQueue.main.async {
            let vc = self.coordinator.mainTabBarScreen
            self.coordinator.mainTabBar.setState(isAuthorized: authorized)
            self.window.rootViewController = vc
            self.window.makeKeyAndVisible()
        }
    }
}
