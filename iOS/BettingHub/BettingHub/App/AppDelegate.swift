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
    
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        IQKeyboardManager.shared.enable = true
//        let vc = LoginViewController()
//        let vc = MainViewController()
//        let vc = ForecastsViewController()
        let vc = UIViewController()
        vc.view.backgroundColor = .white
        let f = FullForecastHeader()
        vc.view.addSubview(f)
        f.snp.makeConstraints { (make) in
            make.top.equalTo(vc.backView?.snp.bottom ?? vc.view)
            make.leading.equalToSuperview().offset(15)
            make.trailing.equalToSuperview().offset(-15)
        }
        let nav = NavigationController(rootViewController: vc)
        
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = nav
        window?.makeKeyAndVisible()
        
        return true
    }
}

