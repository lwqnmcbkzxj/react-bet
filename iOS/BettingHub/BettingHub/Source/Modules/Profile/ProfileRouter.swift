//
//  ProfileRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IProfileRouter: class {
    
    func showForecast(_ forecast: Forecast)
    
    func showSettings(userInfo: UserInfo)
}

class ProfileRouter: IProfileRouter {
    
    private weak var viewController: UIViewController!
    private weak var coordinator: AppCoordinator!
    
    init(viewController: UIViewController, coordinator: AppCoordinator) {
        self.viewController = viewController
        self.coordinator = coordinator
    }
    
    func showForecast(_ forecast: Forecast) {
        let vc = coordinator.fullForecastScreen(forecast: forecast)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showSettings(userInfo: UserInfo) {
        let vc = coordinator.settingsScreen(userInfo: userInfo)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
