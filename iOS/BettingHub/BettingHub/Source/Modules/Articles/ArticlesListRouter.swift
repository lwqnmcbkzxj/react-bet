//
//  ArticlesListRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IArticlesListRouter: class {
    
    func show(article: Article)
}


class ArticlesListRouter: IArticlesListRouter {
    
    weak var coordinator: AppCoordinator!
    weak var viewController: UIViewController!
    
    func show(article: Article) {
        let vc = coordinator.fullArticleScreen(article: article)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
