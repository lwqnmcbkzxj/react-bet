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
    
    @LazyInjected
    private var authService: IAuthService
    
    let storage = UnifyingStorage<Comment, CommentApiObject>()
    
    
    func commentsRequest(id: Int, type: CommentType) -> (RequestContent, URLRequest) {
        let url = "api/\(type.rawValue)/\(id)/comments"
        let content = RequestContent(url, [:])
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    func likeCommentRequest(id: Int, up: Bool) -> (RequestContent, URLRequest) {
        let url = "api/comments/\(id)/\(up ? "like" : "dislike")"
        let content = RequestContent(url, [:])
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
    
    func addCommentRequest(id: Int, type: CommentType,
                           replyId: Int?, text: String) -> (RequestContent, URLRequest) {
        let url = "api/\(type.rawValue)/\(id)/comment"
        let params = [
            "replies_to": replyId?.description,
            "text": text
        ]
        let content = RequestContent(url, params)
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
}

extension CommentService: ICommentService {
    
    func comments(for type: CommentType, id: Int) -> Promise<[Comment]> {
        let promise = Promise<[Comment]>()
        
        let req = commentsRequest(id: id, type: type).1
        
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
    
    func changeRating(to status: RatingStatus, comment: Comment) {
        if authService.authError != nil { return }
        
        let current =  comment.ratingStatus.data
        
        let changeInPoints = current.changeInPoints(for: status)
        comment.rating.data += changeInPoints
        comment.ratingStatus.data = status
        
        let up = current.endpointBool(for: status)
        
        let req = likeCommentRequest(id: comment.id, up: up).1
        httpClient.request(request: req) { (result) in
            result.onSuccess { (_) in
                //wanted to validate but server don't give info about status in single comment req
            }.onFailure { (err) in
                print(err)
                comment.rating.data -= changeInPoints
                comment.ratingStatus.data = current
            }
        }
    }
    
    func addComment(id: Int, replyId: Int?,
                    type: CommentType, text: String) -> Promise<Bool> {
        let promise = Promise<Bool>()
        
        if authService.authError != nil {
            defer { promise.fullfil(with: false) }
            return promise
        }
        
        let req = addCommentRequest(id: id, type: type, replyId: replyId, text: text).1
        
        httpClient.request(request: req) { (result) in
            result.onSuccess { (_) in
                promise.fullfil(with: true)
            }.onFailure { (err) in
                print(err)
            }
        }
        
        return promise
    }
    
    func canComment(for type: CommentType, id: Int) -> Bool {
        return authService.authError == nil
    }
}
