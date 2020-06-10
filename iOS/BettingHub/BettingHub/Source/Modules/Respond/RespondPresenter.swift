//
//  RespondPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 10.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IRespondPresenter: class {
    
    var comment: Comment? { get }
    
    func addComment(text: String, callback: (()->Void)?)
}

class RespondPresenter: IRespondPresenter {
    
    @LazyInjected
    private var commentService: ICommentService
    
    let id: Int
    let comment: Comment? //not nil if comment respons to comment
    let ref: CommentType 
    
    
    init(comment: Comment?, ref: CommentType, id: Int) {
        self.comment = comment
        self.ref = ref
        self.id = id
    }
    
    func addComment(text: String, callback: (()->Void)?) {
        let promise = commentService.addComment(id: id,
                                                replyId: comment?.id,
                                                type: ref,
                                                text: text)
        promise.onComplete { (_) in
            callback?()
        }
    }
}
