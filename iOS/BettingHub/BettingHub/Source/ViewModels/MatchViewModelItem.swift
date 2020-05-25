//
//  MatchViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct MatchViewModelItem {
    
    let match: Match
    
    var fullDateText: String {
        return MatchViewModelItem.fullDateFormatter.string(from: match.date)
    }
    
    var dateText: String {
        return MatchViewModelItem.dateFormatter.string(from: match.date)
    }
    
    var timeText: String {
        return MatchViewModelItem.timeFormatter.string(from: match.date)
    }
    
    var timerText: String {
        let interval = match.date.timeIntervalSince(Date())
        
        let zeroStr = "00:00:00"
        
        if interval < 0 { return zeroStr }
        
        let str = MatchViewModelItem.timerFormatter.string(from: interval) ?? zeroStr
        return str
    }
    
    static private let fullDateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .none
        return formatter
    }()
    
    static private let dateFormatter: DateFormatter = {
       let formatter = DateFormatter()
       formatter.dateStyle = .short
       formatter.timeStyle = .none
       formatter.doesRelativeDateFormatting = true
       return formatter
    }()
    
    static private let timeFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .none
        formatter.timeStyle = .short
        return formatter
    }()
    
    static private let timerFormatter: DateComponentsFormatter = {
        let formatter = DateComponentsFormatter()
        formatter.allowedUnits = [.day, .hour, .minute, .second]
        formatter.unitsStyle = .positional
        return formatter
    }()
}
