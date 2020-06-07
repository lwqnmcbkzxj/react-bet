//
//  Comment.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class Comment {
    let id: Int
    
    let userId: Observable<Int>
    let username: Observable<String>
    let userAvatar: Observable<String>
    let text: Observable<String>
    let refTo: Observable<String>
    let refId: Observable<Int>
    let updateDate: Observable<Date>
    let createDate: Observable<Date>
    let replyId: Observable<Int?>
    let rating: Observable<Int>
    let ratingStatus: Observable<RatingStatus>
    
    
    init(id: Int, userId: Int, username: String, userAvatar: String, text: String, refTo: String, refId: Int, updateDate: Date, createDate: Date, replyId: Int?, rating: Int, ratingStatus: RatingStatus) {
        self.id = id
        self.userId = Observable(userId)
        self.username = Observable(username)
        self.userAvatar = Observable(userAvatar)
        self.text = Observable(text)
        self.refTo = Observable(refTo)
        self.refId = Observable(refId)
        self.updateDate = Observable(updateDate)
        self.createDate = Observable(createDate)
        self.replyId = Observable(replyId)
        self.rating = Observable(rating)
        self.ratingStatus = Observable(ratingStatus)
    }
    
    static func stub() -> Comment {
        .init(id: 0, userId: 0, username: "test", userAvatar: "", text: "testtesttesttest testtesttesttest testtesttesttest testtesttesttest", refTo: "forecast", refId: 0, updateDate: Date(), createDate: Date(), replyId: nil, rating: 10, ratingStatus: .none)
    }
}

