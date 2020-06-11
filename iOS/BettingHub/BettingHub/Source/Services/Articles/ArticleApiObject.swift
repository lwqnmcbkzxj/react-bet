//
//  ArticleApiObject.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ArticleApiObject {
    let id: Int
    let name: String
    let category: String?
    let creationDate: Date
    let updateDate: Date
    let image: String?
    let text: String
    let commentsCount: Int
    let rating: Int
    let ratingStatus: RatingStatus
}

extension ArticleApiObject: Decodable {
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        id = try container.decode(Int.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        category = try container.decode(String?.self, forKey: .category)
        
        let crString = try container.decode(String.self, forKey: .creationDate)
        creationDate = ArticleApiObject.dateFormatter.date(from: crString) ?? Date()
        let updateStr = try container.decode(String.self, forKey: .updateDate)
        updateDate = ArticleApiObject.dateFormatter.date(from: updateStr) ?? Date()
        
        image = try container.decode(String?.self, forKey: .image)
        text = try container.decode(String.self, forKey: .text)
        commentsCount = try container.decode(Int.self, forKey: .commentsCount)
        rating = try container.decode(Int.self, forKey: .rating)
        ratingStatus = try container.decodeIfPresent(RatingStatus.self, forKey: .ratingStatus) ?? .none
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "title"
        case category = "category_name"
        case creationDate = "created_at"
        case updateDate = "updated_at"
        case image = "image"
        case text = "content"
        case commentsCount = "count_comments"
        case rating = "rating"
        case ratingStatus = "vote"
    }
    
    static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SZ"
        return formatter
    }()
}

extension ArticleApiObject: ApiObject {
    
    func applyChanges(to object: Article) {
        object.updateDate.data = self.updateDate
        object.image.data = self.image
        object.text.data = self.text
        object.commentsCount.data = self.commentsCount
        object.rating.data = self.rating
        object.ratingStatus.data = self.ratingStatus
    }
    
    func createObject() -> Article {
        Article(id: id, name: name, category: category, creationDate: creationDate, updateDate: updateDate, image: image, text: text, commentsCount: commentsCount, rating: rating, ratingStatus: ratingStatus)
    }
}
