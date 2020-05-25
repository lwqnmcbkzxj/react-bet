//
//  ArticleViewModelItem.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct ArticleViewModelItem {
    
    let article: Article
    
    var dateText: String {
        return ArticleViewModelItem.dateFormatter.string(from: article.creationDate)
    }
    
    static private let dateFormatter: DateFormatter = {
       let formatter = DateFormatter()
       formatter.dateStyle = .short
       formatter.timeStyle = .short
       formatter.doesRelativeDateFormatting = true
       return formatter
    }()
}
