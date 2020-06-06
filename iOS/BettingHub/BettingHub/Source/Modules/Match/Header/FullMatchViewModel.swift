//
//  FullMatchViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class FullMatchViewModel {
    
    private(set) var match: Match
    
    let timerText = Observable("")
    
    init(match: Match) {
        self.match = match
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { (_) in
            let vm = MatchViewModelItem(match: match)
            self.timerText.data = vm.timerText
        }
    }
    
    deinit {
        timer.invalidate()
    }
    
    func storeBinds(_ binds: [ObservableBind]) {
        self.binds.forEach { $0.close() }
        self.binds = binds
    }
    
    private var timer: Timer!
    
    private var binds = [ObservableBind]()
    
    private let formatter: DateComponentsFormatter = {
        let formatter = DateComponentsFormatter()
        formatter.allowedUnits = [.day, .hour, .minute, .second]
        formatter.unitsStyle = .positional
        return formatter
    }()
}
