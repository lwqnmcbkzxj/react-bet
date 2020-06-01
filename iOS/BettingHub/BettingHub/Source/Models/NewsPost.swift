//
//  NewsPost.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct NewsPost {
    
    let id: Int
    let name: String
    let category: String
    let date: Date
    let text: String
    
    static func stub() -> NewsPost {
        return .init(id: 0,
                     name: "TestNewsPost",
                     category: "TestCategory",
                     date: Date(),
                     text: "Test news post news post news post news post news post. Test news post news post news post news post news post. Test news post news post news post news post news post Test news post news post news post news post news post Test news post news post news post news post news post Test news post news post news post news post news post Test news post news post news post news post news post Test news post news post news post news post news post vTest news post news post news post news post news post")
    }
}

extension NewsPost: Codable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        category = try container.decode(String.self, forKey: .category)
        text = try container.decode(String.self, forKey: .text)
        
        let dateStr = try container.decode(String.self, forKey: .date)
        date = NewsPost.formatter.date(from: dateStr) ?? Date()
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "title"
        case text = "content"
        case category = "category_name"
        case date = "created_at"
    }
    
    private static let formatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SZ"
        return formatter
    }()
}
