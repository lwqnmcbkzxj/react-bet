//
//  ArticleService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ArticleService {
    
    @LazyInjected
    private var reqBuilder: IRequestBuilder
    
    @LazyInjected
    private var httpClient: IHttpClient
    
    func articlesRequest(page: Int, limit: Int) -> (RequestContent, URLRequest) {
        let url = "api/posts"
        let pagedContent = reqBuilder.pagedRequest(url: url, page: page, limit: limit)
        let getReq = reqBuilder.getRequest(content: pagedContent)
        return (pagedContent, getReq)
    }
}

extension ArticleService: IArticleService {
    
    func articles(page: Int, limit: Int, callback: (ServiceCallback<[Article]>)?) {
        let req = articlesRequest(page: page, limit: limit).1
        httpClient.request(request: req) { (res) in
            switch res {
            case .success(let data): callback?(self.decodeArticles(data: data))
            case .failure(let err): callback?(.failure(err.asBHError()))
            }
        }
    }
}

private extension ArticleService {
    
    func decodeArticles(data: Data) -> Result<[Article], BHError> {
        struct ArticlesResponse: Decodable {
            let data: [Article]
        }
        
        let result = data.decodeJSON(ArticlesResponse.self)
        switch result {
        case .success(let res): return .success(res.data)
        case .failure(let err): return .failure(err)
        }
    }
}
