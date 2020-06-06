//
//  ForecasterViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ForecasterViewModelItem {
    
    let forecaster: Forecaster
    
    var signedPercentRoi: Double {
        return forecaster.stats.data.roi * 100
    }
    
    var position: Int {
        guard let pos = forecaster.ratingPosition.data else {
            return 0
        }
        return pos
    }
    
    var passingPercent: Int {
        let stats = forecaster.stats.data
        let sum = stats.wins + stats.loss + stats.back
        if sum == 0 { return 0 }
        return (stats.wins * 100) / sum
    }
}
