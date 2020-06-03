//
//  Forecast.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct Forecast {
    
    private static let service = ServiceLocator.shared.resolve(IForecastService.self)
    
    let id: Int
    let user: Forecaster
    let event: Match
    let text: String
    let creationDate: Date
    let bet: Bet
    let comments: Int
    
    let apiBookmarks: Int
    let apiBookmarked: Bool
    
    var bookmarks: Int {
        guard
            let localBookmarked = Forecast.service.localBookmarked(forecast: self),
            localBookmarked != apiBookmarked
        else { return apiBookmarks }
        
        let plus = localBookmarked && !apiBookmarked ? 1 : -1
        return apiBookmarks + plus    }
    
    var bookmarked: Bool {
        let local = Forecast.service.localBookmarked(forecast: self)
        return local ?? apiBookmarked
    }
    
    let apiRatingStatus: RatingStatus
    let apiRating: Int

    init(id: Int, user: Forecaster, event: Match, text: String, creationDate: Date, bet: Bet, comments: Int, apiBookmarks: Int, apiBookmarked: Bool, apiRatingStatus: RatingStatus, apiRating: Int) {
        self.id = id
        self.user = user
        self.event = event
        self.text = text
        self.creationDate = creationDate
        self.bet = bet
        self.comments = comments
        self.apiBookmarks = apiBookmarks
        self.apiBookmarked = apiBookmarked
        self.apiRatingStatus = apiRatingStatus
        self.apiRating = apiRating
    }
}

extension Forecast: Codable {
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        user = try container.decode(Forecaster.self, forKey: .user)
        event = try container.decode(Match.self, forKey: .event)
        text = try container.decode(String.self, forKey: .text)
        bet = try container.decode(Bet.self, forKey: .bet)
        
        let creationString = try container.decode(String.self, forKey: .creationDate)
        var creationDate = Forecast.dateFormatter().date(from: creationString)
        if creationDate == nil {
            creationDate = Forecast.isoDateFormatter().date(from: creationString)
        }
        if creationDate == nil { throw BHError.wrongDateFormat }
        self.creationDate = creationDate!
        
        let stats = try container.nestedContainer(keyedBy: ForecastStatsKeys.self,
                                                  forKey: .statsContainer)
        apiBookmarks = try stats.decode(Int.self, forKey: .bookmarks)
        comments = try stats.decode(Int.self, forKey: .comments)
        
        apiBookmarked = try container.decodeIfPresent(Bool.self, forKey: .apiBookmarked) ?? false
        apiRatingStatus = try container.decodeIfPresent(RatingStatus.self, forKey: .apiRating) ?? .none
        
        //just.....
        var rating = try? stats.decode(String.self, forKey: .rating).convert(to: Int.self)
        if rating == nil {
            rating = try stats.decodeIfPresent(Int.self, forKey: .rating) ?? 0
        }
        self.apiRating = rating!
    }
    
    func encode(to encoder: Encoder) throws {
        fatalError("Not implemented")
    }
    
    static func stub() -> Forecast {
        .init(id: 0, user: .stub(), event: .stub(), text: "Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.Test text for forecast.", creationDate: Date(), bet: .stub(), comments: 10, apiBookmarks: 10, apiBookmarked: false, apiRatingStatus: .none, apiRating: 10)
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
