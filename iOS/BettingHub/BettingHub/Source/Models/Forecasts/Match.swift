//
//  Match.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Match: Codable {
    
    let id: Int
    let name: String
    let date: Date
    let championship: Championship
    let team1: Team
    let team2: Team
    let betsCount: Int?
    let forecasts: [Match.Forecast]?
    
    init(id: Int, name: String, date: Date, championship: Championship, team1: Team, team2: Team, betsCount: Int?, forecasts: [Match.Forecast]?) {
        self.id = id
        self.name = name
        self.date = date
        self.championship = championship
        self.team1 = team1
        self.team2 = team2
        self.betsCount = betsCount
        self.forecasts = forecasts
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        
        let dateStr = try container.decode(String.self, forKey: .date)
        date = Match.dateFormatter().date(from: dateStr)!
        
        championship = try container.decode(Championship.self, forKey: .championship)
        team1 = try container.decode(Team.self, forKey: .team1)
        team2 = try container.decode(Team.self, forKey: .team2)
        betsCount = try container.decodeIfPresent(Int.self, forKey: .betsCount)
        forecasts = try container.decodeIfPresent([Match.Forecast].self, forKey: .forecasts)
    }
    
    static func stub() -> Match {
        return .init(id: 0,
                     name: "TestMatch",
                     date: Date(),
                     championship: .stub(),
                     team1: .stub(),
                     team2: .stub(),
                     betsCount: 10,
                     forecasts: [])
    }
    
    private enum CodingKeys: String, CodingKey {
        case championship = "championship_data"
        case id = "event_id"
        case name = "event"
        case date = "event_start"
        case team1 = "team_1"
        case team2 = "team_2"
        case betsCount = "forecasts_count"
        case forecasts = "forecasts"
    }
    
    
    private static func dateFormatter() -> DateFormatter {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        return formatter
    }
}

extension Match {
    struct Forecast: Codable {
        let id: Int
        let user: Forecaster
        let bet: Bet
        
        init(with decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            id = try container.decode(Int.self, forKey: .id)
            user = try container.decode(Forecaster.self, forKey: .user)
            bet = try container.decode(Bet.self, forKey: .bet)
        }
        
        private enum CodingKeys: String, CodingKey {
            case id = "id"
            case user = "user_data"
            case bet = "bet_data"
        }
    }
}

extension Match: StringListable {
    
    var stringInList: String { return name }
}
