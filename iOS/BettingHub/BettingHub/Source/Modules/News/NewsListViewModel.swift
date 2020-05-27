//
//  NewsListViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class NewsListViewModel: TableViewModel<NewsPost, Any> {
    
    @LazyInjected
    private var newsService: INewsService
    
    override var pageSize: Int {
        return 5
    }
    
    override func currentPage(_ page: Int) {
        if !isLoading && page > loadedPages {
            fetchData()
        }
    }
    
    private func fetchData() {
        isLoading = true
        newsService.newsList(page: loadedPages + 1, limit: pageSize) { (result) in
            switch result {
            case .success(let news):
                self.items += news
                
            case .failure(let err):
                print(err.localizedDescription)
            }
            self.isLoading = false
        }
    }
}
