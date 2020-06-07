//
//  CommentService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class CommentService {
    
    @LazyInjected
    private var httpClient: IHttpClient
    
    @LazyInjected
    private var reqBuilder: IRequestBuilder
    
    let storage = UnifyingStorage<Comment, CommentApiObject>()
    
    
    func forecastComments(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/forecasts/\(id)/comments"
        let content = RequestContent(url, [:])
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    
    func request(for type: CommentType, id: Int) -> URLRequest? {
        switch type {
        case .forecast: return forecastComments(id: id).1
        default: return nil
        }
    }
}

extension CommentService: ICommentService {
    
    func comments(for type: CommentType, id: Int) -> Promise<[Comment]> {
        let promise = Promise<[Comment]>()
        
        guard let req = request(for: type, id: id) else { return promise }
        
        httpClient.request(request: req) { (result) in
            let mapped = result
                .map { $0.decodeJSONOrNil([CommentApiObject].self)}
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let comments):
                guard let comms = comments else { return }
                let models = comms.map { self.storage.createOrUpdate(obj: $0) }
                promise.fullfil(with: models)
            case .failure(let err):
                print(err)
            }
        }
        
        return promise
    }
}
