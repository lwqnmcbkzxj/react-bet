//
//  IArticleService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IArticleService: class {
    
    var storage: UnifyingStorage<Article, ArticleApiObject> { get }
    
    func articles(page: Int, limit: Int) -> Promise<[Article]>
    
    func article(id: Int) -> Promise<Article>
    
    func rating(to status: RatingStatus, article: Article)
}
