//
//  Forecast.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecast: Codable {
    let id: Int
    let user: Forecaster
    let event: Match
    let text: String
    let creationDate: Date
    let bet: Bet
    let bookmarks: Int
    let comments: Int
    let rating: Int
    
    init(id: Int, user: Forecaster, event: Match, text: String, creationDate: Date, bet: Bet, bookmarks: Int, comments: Int, rating: Int) {
        self.id = id
        self.user = user
        self.event = event
        self.text = text
        self.creationDate = creationDate
        self.bet = bet
        self.bookmarks = bookmarks
        self.comments = comments
        self.rating = rating
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        user = try container.decode(Forecaster.self, forKey: .user)
        event = try container.decode(Match.self, forKey: .event)
        text = try container.decode(String.self, forKey: .text)
        bet = try container.decode(Bet.self, forKey: .bet)
        
        let creationString = try container.decode(String.self, forKey: .creationDate)
        guard
            let creationDate = Forecast.dateFormatter().date(from: creationString)
        else { throw BHError.unexpectedContent }
        self.creationDate = creationDate
        
        let stats = try container.nestedContainer(keyedBy: ForecastStatsKeys.self,
                                                  forKey: .statsContainer)
        bookmarks = try stats.decode(Int.self, forKey: .bookmarks)
        comments = try stats.decode(Int.self, forKey: .comments)
        rating = try stats.decode(Int.self, forKey: .rating)
    }
    
    func encode(to encoder: Encoder) throws {
        fatalError("Not implemented")
    }
    
    static func stub() -> Forecast {
        .init(id: 0,
              user: .stub(),
              event: .stub(),
              text: "Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.",
              creationDate: Date(),
              bet: .stub(),
              bookmarks: 10,
              comments: 10,
              rating: 20)
    }
    
    private static func dateFormatter() -> DateFormatter {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        return formatter
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case user = "user_data"
        case text = "forecast_text"
        case event = "event_data"
        case creationDate = "forecast_created_at"
        case bet = "bet_data"
        
        case statsContainer = "forecast_stats"
    }
    
    private enum ForecastStatsKeys: String, CodingKey {
        case bookmarks = "count_subscribers"
        case comments = "count_comments"
        case rating = "rating"
    }
}
