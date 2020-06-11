//
//  ArticleCellManager.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ArticleCellManager {
    
    @LazyInjected
    private var articleService: IArticleService
    
    @LazyInjected
    private var authService: IAuthService
    
    private var binds: [ObservableBind] = []
    
    func storeBinds(_ binds: [ObservableBind]) {
        self.binds.forEach { $0.close() }
        self.binds = binds
    }
    
    func canChangeRating() -> Bool {
        authService.authError == nil
    }
    
    func rating(to status: RatingStatus, article: Article) {
        if !canChangeRating() {
            return
        }
        
        articleService.rating(to: status, article: article)
    }
}
