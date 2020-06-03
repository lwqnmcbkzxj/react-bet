//
//  ForecastsFilerControl.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastFilterControl: PanelSegmenterControl {
    
    var selectedFilter: ForecastFilter {
        [
            0: ForecastFilter.subscribers,
            1: ForecastFilter.all,
//            2: ForecastFilter.paid
        ][selectedSegment ?? 1]!
    }
    
    init() {
        super.init(items: [Text.subscribtions, Text.allForecasts])//, Text.paid])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
