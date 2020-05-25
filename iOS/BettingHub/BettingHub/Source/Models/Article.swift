//
//  Article.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Article {
    
    let id: Int
    let name: String
    let category: String?
    let creationDate: Date
    let image: String?
    let text: String
    let commentsCount: Int
    let rating: Int
    
    init(id: Int, name: String, category: String, creationDate: Date, image: String?, text: String, commentsCount: Int, rating: Int) {
        self.id = id
        self.name = name
        self.category = category
        self.creationDate = creationDate
        self.image = image
        self.text = text
        self.commentsCount = commentsCount
        self.rating = rating
    }
    
    static func stub() -> Article {
        return .init(id: 0,
                     name: "Text article title",
                     category: "Test category",
                     creationDate: Date(),
                     image: nil,
                     text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
                     commentsCount: 3,
                     rating: 23)
    }
}

extension Article: Codable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        id = try container.decode(Int.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        category = try container.decode(String?.self, forKey: .category)
        
        let crString = try container.decode(String.self, forKey: .creationDate)
        creationDate = Article.dateFormatter.date(from: crString)!
        
        image = try container.decode(String?.self, forKey: .image)
        text = try container.decode(String.self, forKey: .text)
        commentsCount = try container.decode(Int.self, forKey: .commentsCount)
        rating = try container.decode(Int.self, forKey: .rating)
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "title"
        case category = "category_name"
        case creationDate = "created_at"
        case image = "image"
        case text = "content"
        case commentsCount = "count_comments"
        case rating = "rating"
    }
    
    static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SZ"
        return formatter
    }()
}
