//
//  MatchAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 06.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MatchAssembly {
    
    func module(match: Match) -> UIViewController {
        let matchVm = FullMatchViewModel(match: match)
        let header = MatchView(viewModel: matchVm)
        
        let vc = MatchViewController()
        vc.matchView = header
        
        return vc
    }
}

