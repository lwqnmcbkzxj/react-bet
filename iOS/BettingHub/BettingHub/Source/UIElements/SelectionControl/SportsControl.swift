//
//  SportsControl.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 14.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SportsControl: SelectionControl {
    
    @LazyInjected private var sportsService: ISportService
    
    var selectedSport: Sport? {
        guard let index = selectedIndex else { return nil }
        return sports[index]
    }
    
    private(set) var sports: [Sport] = []
    
    init() {
        super.init(items: [])
        configure(with: sportsService.currentSports)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with sports: [Sport]) {
        self.sports = sports
        let items = sports.map { $0.name }
        super.configure(with: items)
    }
}
