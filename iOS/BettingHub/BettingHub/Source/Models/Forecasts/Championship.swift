//
//  Championship.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Championship: Codable {
    let id: Int
    let name: String
    let sport: Sport
    
    init(id: Int, name: String, sport: Sport) {
        self.id = id
        self.name = name
        self.sport = sport
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        id = try container.decode(Int.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        
        let sportId = try container.decode(Int.self, forKey: .sportId)
        sport = Sport(id: sportId)
    }
    
    func encode(to encoder: Encoder) throws {
        fatalError("Not implemented")
    }
    
    static func stub() -> Championship {
        .init(id: 0,
              name: "Test championship",
              sport: .stub())
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "championship_id"
        case name = "championship"
        case sportId = "sport_id"
    }
}

extension Championship: StringListable {
    
    var stringInList: String { return name }
}
