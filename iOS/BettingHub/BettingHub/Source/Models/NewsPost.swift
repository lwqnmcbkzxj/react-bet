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
    
}
