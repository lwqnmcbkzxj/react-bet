//
//  IArticleService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IArticleService: class {
    
    func articles(page: Int, limit: Int, callback: (ServiceCallback<[Article]>)?)
}
