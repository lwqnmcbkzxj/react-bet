//
//  AppDelegate.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import IQKeyboardManagerSwift

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    @LazyInjected
    private var authService: IAuthService
    
    @LazyInjected
    private var appCoordinator: AppCoordinator
    
    var window: UIWindow?
    
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        IQKeyboardManager.shared.enable = true
        
        window = UIWindow(frame: UIScreen.main.bounds)
        
        let appInitializer = AppInitializer(coordinator: appCoordinator, window: window!)

        appInitializer.start()
        
        return true
    }
    
    func application(_ app: UIApplication, open url: URL,
                     options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        
        guard
            let host = url.host
        else { return true }
        
        if host == "auth" {
            authService.redirectedAuth(with: url)
        }
        
        return true
    }
}

