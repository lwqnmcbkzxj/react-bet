//
//  Sport.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

struct Sport: Codable {
    let id: Int
    let name: String
//    let image: String //TODO: sports will have their image in api/sports request
    
    init(id: Int) {
        let sport = Sport.sportService.currentSports.first(where: {$0.id == id}) ?? .all
        self.id = sport.id
        self.name = sport.name
    }
    
    static var all: Sport {
        return Sport(id: 0, name: "all".localized)
    }
    
    static func stub() -> Sport {
        return .init(id: 1,
                     name: "Football")
    }
    
    private init(id: Int, name: String) {
        self.id = id
        self.name = name
    }
    
    @LazyInjected private static var sportService: ISportService
}
