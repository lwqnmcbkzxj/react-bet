//
//  FullForecastRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IFullForecastRouter: class {
    
    func showForecaster(_ forecaster: Forecaster)
}

class FullForecasterRouter: IFullForecastRouter {
    
    private let viewController: UIViewController
    private let coordinator: AppCoordinator
    
    init(viewController: UIViewController, coordinator: AppCoordinator) {
        self.viewController = viewController
        self.coordinator = coordinator
    }
    
    func showForecaster(_ forecaster: Forecaster) {
        let vc = coordinator.guestProfile()
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
