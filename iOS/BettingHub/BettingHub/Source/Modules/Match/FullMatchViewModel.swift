//
//  FullMatchViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class FullMatchViewModel {
    
    var match: Match?
    
    private var timer: Timer!
    
    private let formatter: DateComponentsFormatter = {
        let formatter = DateComponentsFormatter()
        formatter.allowedUnits = [.day, .hour, .minute, .second]
        formatter.unitsStyle = .positional
        return formatter
    }()
    
    init() {
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { (_) in
            guard let match = self.match else { return }
            let vm = MatchViewModelItem(match: match)
            self.timerCallback?(vm.timerText)
        }
    }
    
    deinit {
        timer.invalidate()
    }
    
    var timerCallback: ((String) -> Void)?
    
    func configure(match: Match) {
        self.match = match
    }
}
