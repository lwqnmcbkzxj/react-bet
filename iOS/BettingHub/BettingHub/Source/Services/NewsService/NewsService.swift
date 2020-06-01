//
//  NewsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class NewsService {
    
    @LazyInjected
    private var httpClient: IHttpClient
    
    @LazyInjected
    private var reqBuilder: IRequestBuilder
    
    func newsRequest(page: Int, limit: Int) -> (RequestContent, URLRequest) {
        let url = "api/news"
        let content = reqBuilder.pagedRequest(url: url, page: page, limit: limit)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    
}

extension NewsService: INewsService {
    
    func newsList(page: Int, limit: Int, callback: (ServiceCallback<[NewsPost]>)?) {
        let req = newsRequest(page: page, limit: limit).1
        httpClient.request(request: req) { (result) in
            guard let callback = callback else { return }
            result
                .map { $0.decodePaged(pageElement: NewsPost.self) }
                .mapError { $0.asBHError() }
                .onSuccess { $0.invokeCallback(callback) }
                .onFailure { callback(.failure($0)) }
        }
        
    }
}
