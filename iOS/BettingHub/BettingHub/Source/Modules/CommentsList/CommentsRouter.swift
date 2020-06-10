//
//  CommentsRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 10.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ICommentsRouter: class {
    
    func reply(to comment: Comment)
    
    func newComment(type: CommentType, id: Int)
}
