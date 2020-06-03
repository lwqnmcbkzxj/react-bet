//
//  MarksAdapter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class MarksAdapter<T> {
    
    @LazyInjected
    private var storage: IMarksStorage
    
    func saveBookmark(id: Int, bookmarked: Bool) {
        storage.saveBookmark(bookmarked, id: id, type: T.self)
    }
    
    func getBookmark(id: Int) -> Bool? {
        storage.getBookmark(id: id, type: T.self)
    }
    
    func saveRating(id: Int, status: RatingStatus) {
        storage.saveRating(status, id: id, type: T.self)
    }
    
    func getRating(id: Int) -> RatingStatus? {
        storage.getRating(id: id, type: T.self)
    }
}
