//
//  Forecast.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecast {
    
    let id: Int
    let user: Forecaster
    
    let event: Observable<Match>
    let text: Observable<String>
    let creationDate: Observable<Date>
    let bet: Observable<Bet>
    let comments: Observable<Int>
    let bookmarks: Observable<Int>
    let bookmarked: Observable<Bool>
    let rating: Observable<Int>
    let ratingStatus: Observable<RatingStatus>
    
    init(id: Int, user: Forecaster, event: Match, text: String, creationDate: Date, bet: Bet, comments: Int, bookmarks: Int, bookmarked: Bool, ratingStatus: RatingStatus, rating: Int) {
        self.id = id
        self.user = user
        self.event = Observable(event)
        self.text = Observable(text)
        self.creationDate = Observable(creationDate)
        self.bet = Observable(bet)
        self.comments = Observable(comments)
        self.bookmarks = Observable(bookmarks)
        self.bookmarked = Observable(bookmarked)
        self.ratingStatus = Observable(ratingStatus)
        self.rating = Observable(rating)
    }
    
    static func stub() -> Forecast {
        .init(id: 0, user: .stub(), event: .stub(), text: "Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.", creationDate: Date(), bet: .stub(), comments: 10, bookmarks: 10, bookmarked: false, ratingStatus: .none, rating: 10)
    }
}

struct ForecastApiObject: Decodable {
    let id: Int
    let user: ForecasterApiObject
    let event: Match
    let text: String
    let creationDate: Date
    let bet: Bet
    let comments: Int
    let bookmarks: Int
    let bookmarked: Bool
    let ratingStatus: RatingStatus
    let rating: Int
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        user = try container.decode(ForecasterApiObject.self, forKey: .user)
        event = try container.decode(Match.self, forKey: .event)
        text = try container.decode(String.self, forKey: .text)
        bet = try container.decode(Bet.self, forKey: .bet)
        
        let creationString = try container.decode(String.self, forKey: .creationDate)
        var creationDate = ForecastApiObject.dateFormatter().date(from: creationString)
        if creationDate == nil {
            creationDate = ForecastApiObject.isoDateFormatter().date(from: creationString)
        }
        if creationDate == nil { throw BHError.wrongDateFormat }
        self.creationDate = creationDate!
        
        let stats = try container.nestedContainer(keyedBy: ForecastStatsKeys.self,
                                                  forKey: .statsContainer)
        bookmarks = try stats.decode(Int.self, forKey: .bookmarks)
        comments = try stats.decode(Int.self, forKey: .comments)
        
        bookmarked = try container.decodeIfPresent(Bool.self, forKey: .apiBookmarked) ?? false
        ratingStatus = try container.decodeIfPresent(RatingStatus.self, forKey: .apiRating) ?? .none
        
        //just.....
        var rating = try? stats.decode(String.self, forKey: .rating).convert(to: Int.self)
        if rating == nil {
            rating = try stats.decodeIfPresent(Int.self, forKey: .rating) ?? 0
        }
        self.rating = rating!
    }
    
    private static func dateFormatter() -> DateFormatter {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        return formatter
    }
    
    private static func isoDateFormatter() -> DateFormatter {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")!
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SZ"
        return formatter
    }
    
    private enum CodingKeys: String, CodingKey {
        case id = "id"
        case user = "user_data"
        case text = "forecast_text"
        case event = "event_data"
        case creationDate = "forecast_created_at"
        case bet = "bet_data"
        case apiBookmarked = "is_marked"
        case apiRating = "vote"
        
        case statsContainer = "forecast_stats"
    }
    
    private enum ForecastStatsKeys: String, CodingKey {
        case bookmarks = "count_subscribers"
        case comments = "count_comments"
        case rating = "rating"
    }
}
