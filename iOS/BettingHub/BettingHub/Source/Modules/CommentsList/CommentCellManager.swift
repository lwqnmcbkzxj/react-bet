//
//  CommentCellManager.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 10.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class CommentCellManager {
    
    @LazyInjected
    private var commentService: ICommentService
    
    @LazyInjected
    private var authService: IAuthService
    
    private var binds: [ObservableBind] = []
    
    func storeBinds(_ binds: [ObservableBind]) {
        self.binds.forEach { $0.close() }
        self.binds = binds
    }
    
    func canRate() -> Bool {
        return authService.authError == nil
    }
    
    func canReply(to comment: Comment) -> Bool {
        return commentService.canComment(for: comment.refTo.data,
                                         id: comment.refId.data)
    }
    
    func changeRating(to status: RatingStatus, comment: Comment) {
        if !canRate() {
            print("can't change rating. Unauthorized")
            return
        }
        
        commentService.changeRating(to: status, comment: comment)
    }
}
