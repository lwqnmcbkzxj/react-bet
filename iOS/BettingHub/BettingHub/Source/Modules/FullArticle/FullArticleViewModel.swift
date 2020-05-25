//
//  FullArticleViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullArticleViewModel {
    
    let article: Article
    
    init(article: Article) {
        self.article = article
    }
    
    func createProviders(with tableView: UITableView) -> [TableSectionProvider] {
        [FullArticleSectionProvider(tableView: tableView, article: article),
        //        CommentsViewModel(tableView: tableView), //TODO: tempUI
        SimilarArticlesViewModel(tableView: tableView)]
    }
}
