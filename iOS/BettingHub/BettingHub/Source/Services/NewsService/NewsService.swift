//
//  NewsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class NewsService {
    
}

extension NewsService: INewsService {
    
    func newsList(page: Int, limit: Int, callback: (ServiceCallback<[NewsPost]>)?) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let news = Array<NewsPost>.init(repeating: .stub(), count: limit)
            callback?(.success(news))
        }
        
    }
    
    func newsPost(id: Int, callback: (ServiceCallback<NewsPost>)?) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            callback?(.success(.stub()))
        }
    }
}
