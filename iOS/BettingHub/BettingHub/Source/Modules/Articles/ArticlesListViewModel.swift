//
//  ArticlesListViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ArticlesListViewModel: TableViewModel<Article, Any> {
    
    @LazyInjected
    private var articlesService: IArticleService
    
    override var pageSize: Int { 5 }
    
    override func currentPage(_ page: Int) {
        if page > loadedPages && !isLoading {
            fetchMore()
        }
    }
    
    private func fetchMore() {
        isLoading = true
        articlesService.articles(page: loadedPages + 1, limit: pageSize).onComplete { (articles) in
            self.items += articles
            self.isLoading = false
        }
    }
}
