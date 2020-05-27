//
//  NewsPostViewModelItem.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct NewsPostViewModelItem {
    
    let newsPost: NewsPost
    
    var dateText: String {
        return NewsPostViewModelItem.dateFormatter.string(from: newsPost.date)
    }
    
    static private let dateFormatter: DateFormatter = {
       let formatter = DateFormatter()
       formatter.dateStyle = .short
       formatter.timeStyle = .short
       formatter.doesRelativeDateFormatting = true
       return formatter
    }()
}
