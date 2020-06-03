//
//  MarksStorage.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class MarksStorage: IMarksStorage {
    private(set) var bookmarks = [String: Bool]()
    private(set) var ratings = [String: RatingStatus]()
    
    func saveBookmark<T>(_ bookmarked: Bool, id: Int, type: T.Type) {
        let key = self.key(from: type, id: id)
        bookmarks[key] = bookmarked
    }
    
    func getBookmark<T>(id: Int, type: T.Type) -> Bool? {
        let key = self.key(from: type, id: id)
        return bookmarks[key]
    }
    
    func saveRating<T>(_ status: RatingStatus, id: Int, type: T.Type) {
        let key = self.key(from: type, id: id)
        ratings[key] = status
    }
    
    func getRating<T>(id: Int, type: T.Type) -> RatingStatus? {
        let key = self.key(from: type, id: id)
        return ratings[key]
    }
    
    private func key<T>(from type: T.Type, id: Int) -> String {
        return String(describing: type) + id.description
    }
}
