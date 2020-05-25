//
//  ForecastersRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IForecastersRouter: class {
    func show(_ forecaster: Forecaster)
}

class ForecastersRouter: IForecastersRouter {
    
    weak var coordinator: AppCoordinator!
    weak var viewController: UIViewController!
    
    func show(_ forecaster: Forecaster) {
        let vc = coordinator.profile(forecaster: forecaster)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
