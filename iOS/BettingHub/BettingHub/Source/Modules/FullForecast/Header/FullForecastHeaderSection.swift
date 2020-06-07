//
//  FullForecastHeaderSection.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullForecastHeaderSection: TableSectionProvider {
    
    let fullForecastHeader: FullForecastHeader
    
    init(header: FullForecastHeader) {
        self.fullForecastHeader = header
    }
    
    func header() -> UIView? {
        return fullForecastHeader
    }
    
    func numberOfCells() -> Int {
        return 0
    }
    
    func cell(for row: Int) -> UITableViewCell {
        fatalError()
    }
    
}
