//
//  CommentApiObject.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct CommentApiObject {
    let id: Int
    let userId: Int
    let username: String
    let userAvatar: String
    let text: String
    let refTo: String
    let refId: Int
    let updateDate: Date
    let createDate: Date
    let replyId: Int?
    let rating: Int
    let ratingStatus: RatingStatus
}

extension CommentApiObject: Decodable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        userId = try container.decode(Int.self, forKey: .userId)
        username = try container.decode(String.self, forKey: .username)
        userAvatar = try container.decode(String.self, forKey: .userAvatar)
        
        var text = try? container.decode(String.self, forKey: .text)
        if text == nil {
            text = try? container.decode(Int.self, forKey: .text).description
        }
        self.text = text ?? ""
            
        refTo = try container.decode(String.self, forKey: .refTo)
        refId = try container.decode(Int.self, forKey: .refId)
        
        
        let updateString = try container.decode(String.self, forKey: .updateDate)
        updateDate = CommentApiObject.formatter.date(from: updateString) ?? Date()
        
        let createString = try container.decode(String.self, forKey: .createDate)
        createDate = CommentApiObject.formatter.date(from: createString) ?? Date()
        
        replyId = try container.decodeIfPresent(Int.self, forKey: .replyId)
        rating = try container.decode(Int.self, forKey: .rating)
        ratingStatus = try container.decodeIfPresent(RatingStatus.self, forKey: .ratingStatus) ?? .none
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case userId = "user_id"
        case username = "user_name"
        case userAvatar = "user_avatar"
        case text = "text"
        case refTo = "reference_to"
        case refId = "referent_id"
        case updateDate = "updated_at"
        case createDate = "created_at"
        case replyId = "replies_to"
        case rating = "rating"
        case ratingStatus = "vote"
    }
    
    static private let formatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SZ"
        return formatter
    }()
}

extension CommentApiObject: ApiObject {

    func applyChanges(to object: Comment) {
        object.userId.data = self.userId
        object.username.data = self.username
        object.userAvatar.data = self.userAvatar
        object.text.data = self.text
        object.refTo.data = self.refTo
        object.refId.data = self.refId
        object.updateDate.data = self.updateDate
        object.createDate.data = self.createDate
        object.replyId.data = self.replyId
        object.rating.data = self.rating
        object.ratingStatus.data = self.ratingStatus
    }
    
    func createObject() -> Comment {
        Comment(id: id, userId: userId, username: username, userAvatar: userAvatar, text: text, refTo: refTo, refId: refId, updateDate: updateDate, createDate: createDate, replyId: replyId, rating: rating, ratingStatus: ratingStatus)
    }
}
