//
//  SettingsRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol ISettingsRouter: class {
    
    func changeToLoginScreen()
}

class SettingsRouter: ISettingsRouter {
    
    weak var viewController: UIViewController!
    weak var coordinator: AppCoordinator!
    
    func changeToLoginScreen() {
        coordinator.mainTabBar.setState(isAuthorized: false)
    }
}
