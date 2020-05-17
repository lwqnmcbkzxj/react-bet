//
//  BookmakersRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IBookmakersRouter: class {
    
    func showBookmaker(_ bookmaker: Bookmaker)
}

class BookmakersRouter: IBookmakersRouter {
    
    var viewController: UIViewController!
    var coordinator: AppCoordinator!
    
    func showBookmaker(_ bookmaker: Bookmaker) {
        let vc = coordinator.bookmakerScreen(bookmaker)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
