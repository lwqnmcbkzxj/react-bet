//
//  MatchesRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IMatchesRouter: class {
    
    func show(_ match: Match)
}

class MatchesRouter {
    
    weak var coordinator: AppCoordinator!
    weak var viewController: UIViewController!
    
}

extension MatchesRouter: IMatchesRouter {
    
    func show(_ match: Match) {
        let vc = coordinator.matchScreen(match)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
