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
    
    @LazyInjected
    private var authService: IAuthService
    
    let storage = UnifyingStorage<Article, ArticleApiObject>()
    
    func articlesRequest(page: Int, limit: Int) -> (RequestContent, URLRequest) {
        let url = "api/posts"
        let pagedContent = reqBuilder.pagedRequest(url: url, page: page, limit: limit)
        let getReq = reqBuilder.getRequest(content: pagedContent)
        return (pagedContent, getReq)
    }
    
    func articleRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/posts"
        let content = reqBuilder.idRequest(url: url, id: id)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    func ratingRequest(_ up: Bool, id: Int) -> (RequestContent, URLRequest) {
        let url = "api/posts/\(id)/\(up ? "like" : "dislike")"
        let content = RequestContent(url, [:])
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
}

extension ArticleService: IArticleService {
    
    func articles(page: Int, limit: Int) -> Promise<[Article]> {
        let req = articlesRequest(page: page, limit: limit).1
        
        let promise = Promise<[Article]>()
        
        httpClient.request(request: req) { (res) in
            let mapped = res.map { $0.decodePagedOrNil(pageElement: ArticleApiObject.self)}
            switch mapped {
            case .success(let objs):
                guard let objs = objs else { return }
                let articles = objs.map { self.storage.createOrUpdate(obj: $0) }
                promise.fullfil(with: articles)
                
            case .failure(let err):
                print(err)
            }
        }
        
        return promise
    }
    
    @discardableResult
    func article(id: Int) -> Promise<Article> {
        let promise = Promise<Article>()
        
        let req = articleRequest(id: id).1
        
        httpClient.request(request: req) { (result) in
            let mapped = result
                .map { $0.decodeJSONOrNil(ArticleApiObject.self) }
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let obj):
                guard let obj = obj else { return }
                let article = self.storage.createOrUpdate(obj: obj)
                promise.fullfil(with: article)
                
            case .failure(let err):
                print(err)
            }
        }
        
        return promise
    }
    
    func rating(to status: RatingStatus, article: Article) {
        if authService.authError != nil { return }
        
        let current = article.ratingStatus.data
        
        guard status != current
        else {
            print("Unexpected rating behavior. Ignoring")
            return
        }
        
        let change = current.changeInPoints(for: status)
        article.rating.data += change
        article.ratingStatus.data = status
        
        let up = current.endpointBool(for: status)
        
        let req = ratingRequest(up, id: article.id).1
        httpClient.request(request: req) { (res) in
            res.onSuccess { (_) in
                self.article(id: article.id)
            }.onFailure { (err) in
                print(err)
            }
        }
    }
}
