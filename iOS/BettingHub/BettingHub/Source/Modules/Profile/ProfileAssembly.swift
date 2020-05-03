//
//  ProfileAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ProfileAssembly {
    
    func module(coordinator: AppCoordinator) -> UIViewController {
        let vc = ProfileViewController()
        let router = ProfileRouter(viewController: vc, coordinator: coordinator)
        let userForecasts = UserForecastsViewModel()
        let userFavorites = UserFavoritesViewModel()
        let userStats = ProfileStatisticsViewModel()
        
        vc.router = router
        vc.userForecastsViewModel = userForecasts
        vc.userStatsViewModel = userStats
        vc.userFavoritesViewModel = userFavorites
        
        return vc
    }
}
