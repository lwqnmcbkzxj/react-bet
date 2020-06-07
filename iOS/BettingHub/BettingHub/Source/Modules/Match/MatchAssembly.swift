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
        let interactor = MatchInteractor(match: match)
        
        let matchVm = FullMatchViewModel(interactor: interactor)
        let header = MatchView(viewModel: matchVm)
        
        let vc = MatchViewController()
        
        let bets = MatchBetsViewModel(tableView: vc.tableView,
                                      interactor: interactor,
                                      sectionNumber: 0)
        let comments = CommentsViewModel(tableView: vc.tableView, sectionNumber: 1,
                                         type: .match, id: match.id)
        vc.setSections([bets])
        
        vc.matchView = header
        
        return vc
    }
}

