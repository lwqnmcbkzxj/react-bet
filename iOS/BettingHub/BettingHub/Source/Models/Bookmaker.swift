//
//  Bookmaker.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Bookmaker {
    let id: Int
    let title: String
    let content: String?
    let rating: Double
    let bonus: Double
    let link: String
    let image: String
    
    static func stub() -> Bookmaker {
        return .init(id: 0,
                     title: "1XСтавка",
                     content: "Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker.Content bookmaker. Content bookmaker. Content bookmaker. Content bookmaker.",
                     rating: 9.4,
                     bonus: 4000,
                     link: "https://1xstavka.ru",
                     image: "/storage/bookmakers/1xstavka.png")
    }
}

extension Bookmaker: Decodable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        id = try container.decode(Int.self, forKey: .id)
        title = try container.decode(String.self, forKey: .title)
        content = try container.decodeIfPresent(String.self, forKey: .content)
        rating = try container.decode(String.self, forKey: .rating).convert(to: Double.self)!
        bonus = try container.decode(String.self, forKey: .bonus).convert(to: Double.self)!
        link = try container.decode(String.self, forKey: .link)
        image = try container.decode(String.self, forKey: .image)
    }
    
    private enum CodingKeys: String, CodingKey {
        case id
        case title
        case content
        case rating
        case bonus
        case link
        case image
    }
}

extension Bookmaker: StringListable {
    
    var stringInList: String { return title }
}
