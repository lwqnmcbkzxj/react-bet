//
//  FullMatchViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class FullMatchViewModel {
    
    let timerText = Observable("")
    private(set) lazy var match = interactor.match
    
    private let interactor: IMatchInteractor
    
    private var timer: Timer!
    
    private var viewBinds = [ObservableBind]()
    
    init(interactor: IMatchInteractor) {
        self.interactor = interactor
        setupTimer()
    }
    
    deinit {
        timer.invalidate()
    }
    
    func storeBinds(_ binds: [ObservableBind]) {
        self.viewBinds.forEach { $0.close() }
        self.viewBinds = binds
    }
    
    private func setupTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { (_) in
            let vm = MatchViewModelItem(match: self.match.data)
            self.timerText.data = vm.timerText
        }
    }
    
    private let formatter: DateComponentsFormatter = {
        let formatter = DateComponentsFormatter()
        formatter.allowedUnits = [.day, .hour, .minute, .second]
        formatter.unitsStyle = .positional
        return formatter
    }()
}
