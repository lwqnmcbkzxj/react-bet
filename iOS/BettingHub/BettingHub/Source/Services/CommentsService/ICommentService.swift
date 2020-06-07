//
//  ICommentService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum CommentType {
    case forecast
    case match
}

protocol ICommentService: class {
    
    var storage: UnifyingStorage<Comment, CommentApiObject> { get }
    
    func comments(for type: CommentType, id: Int) -> Promise<[Comment]>
}
