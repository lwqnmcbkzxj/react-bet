//
//  IMarksStorage.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IMarksStorage: class {
    func saveBookmark<T>(_ bookmarked: Bool, id: Int, type: T.Type)
    func getBookmark<T>(id: Int, type: T.Type) -> Bool?
    
    func saveRating<T>(_ status: RatingStatus, id: Int, type: T.Type)
    func getRating<T>(id: Int, type: T.Type) -> RatingStatus?
}
