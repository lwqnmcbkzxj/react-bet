//
//  FullArticleViewPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class FullArticleViewPresenter {
    
    @LazyInjected
    private var articleService: IArticleService
    
    let article: Article
    
    private var binds: [ObservableBind] = []
    
    init(article: Article) {
        self.article = article
    }
    
    func storeBinds(_ binds: [ObservableBind]) {
        self.binds.forEach { $0.close() }
        self.binds = binds
    }
    
    func rating(to status: RatingStatus) {
        articleService.rating(to: status, article: article)
    }
}
