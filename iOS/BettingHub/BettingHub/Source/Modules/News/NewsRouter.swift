//
//  NewsRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol INewsRouter: class {
    
    func showNewsPost(_ newsPost: NewsPost)
}

class NewsRouter: INewsRouter {
    
    var coordinator: AppCoordinator!
    
    var viewController: UIViewController!
    
    func showNewsPost(_ newsPost: NewsPost) {
        let vc = coordinator.newsPostScreen(for: newsPost)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}

