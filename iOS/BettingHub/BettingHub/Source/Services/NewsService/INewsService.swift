//
//  INewsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol INewsService: class {
    
    func newsList(page: Int, limit: Int, callback: (ServiceCallback<[NewsPost]>)?)
    
    func newsPost(id: Int, callback: (ServiceCallback<NewsPost>)?)
}
