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
    
    func auth(with network: SocialNetwork)
}

class LoginRouter: ILoginRouter {
    
    weak var viewController: UIViewController!
    
    private let coordinator: AppCoordinator
    
    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
    }
    
    func proceed() {
        coordinator.mainTabBar.setState(isAuthorized: true)
    }
    
    func auth(with network: SocialNetwork) {
        let vc = coordinator.socialNetworkAuth(network: network)
        viewController.present(vc, animated: true, completion: nil)
    }
}
