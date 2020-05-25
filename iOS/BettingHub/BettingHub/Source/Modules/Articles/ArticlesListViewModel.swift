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
        articlesService.articles(page: loadedPages + 1, limit: 10) { (result) in
            switch result {
            case .success(let articles):
                self.items += articles
            case .failure(let err):
                print(err.localizedDescription)
            }
            self.isLoading = false
        }
    }
}
