//
//  ForecastsRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IForecastsRouter: class {
    
    func showFullForecastScreen(_ forecast: Forecast)
    
    func showUserScreen(_ forecaster: Forecaster)
}


class ForecastsRouter: IForecastsRouter {
    
    weak var viewController: UIViewController!
    
    let coordinator: AppCoordinator
    
    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
    }
    
    func showFullForecastScreen(_ forecast: Forecast) {
        let vc = coordinator.fullForecastScreen(forecast: forecast)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func showUserScreen(_ forecaster: Forecaster) {
        let vc = coordinator.profile(forecaster: forecaster)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
