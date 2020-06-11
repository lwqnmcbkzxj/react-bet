//
//  FullArticleAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullArticleAssembly {
    
    func module(article: Article, coordinator: AppCoordinator) -> UIViewController {
        let router = FullArticleRouter()
        let vc = FullArticleViewController()
        
        router.viewController = vc
        router.coordinator = coordinator
        
        let sections: [TableSectionProvider] = [
            FullArticleSectionProvider(tableView: vc.tableView, article: article),
            CommentsViewModel(tableView: vc.tableView,
                              sectionNumber: 1,
                              type: .articles,
                              id: article.id,
                              router: router),
            SimilarArticlesViewModel(tableView: vc.tableView)
        ]
        
        vc.router = router
        vc.sections = sections
        
        return vc
    }
}
