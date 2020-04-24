//
//  LoginRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol ILoginRouter: class {
    
    func proceed()
}

class LoginRouter: ILoginRouter {
    
    weak var viewController: UIViewController!
    
    private let coordinator: AppCoordinator
    
    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
    }
    
    func proceed() {
        let tabBar = coordinator.mainTabBarScreen
        viewController?.present(tabBar, animated: true, completion: nil)
    }
}
