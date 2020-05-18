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
    
    private let coordinator: AppCoordinator

    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
    }
    
    func start(with window: UIWindow) {
        
        initialConfiguration()
        
//        let vc = coordinator.mainTabBarScreen
        
//        let vc = UIViewController()
//        vc.view.backgroundColor = .white
//        let m = MatchView()
//        vc.view.addSubview(m)
//        m.snp.makeConstraints { (make) in
//            make.leading.top.equalToSuperview().offset(15)
//            make.trailing.equalToSuperview().offset(-15)
////            make.height.equalTo(140)
//        }
//        m.configure(match: .stub())
        let vc = NavigationController(rootViewController: coordinator.matchScreen(.stub())) 
        window.rootViewController = vc
        window.makeKeyAndVisible()
//
//        if let authErr = authService.isAuthorized {
//            coordinator.mainTabBar.setState(isAuthorized: false)
//        } else {
//            coordinator.mainTabBar.setState(isAuthorized: true)
//        }
        
        
        
        
    }
    
    private func initialConfiguration() {
        sportsService.updateKnownSports {}
    }
}
