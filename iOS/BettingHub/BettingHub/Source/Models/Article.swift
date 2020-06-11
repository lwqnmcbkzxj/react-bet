//
//  Article.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class Article {
    
    let id: Int
    let name: String
    let category: String?
    let creationDate: Date
    
    let updateDate: Observable<Date>
    let image: Observable<String?>
    let text: Observable<String>
    let commentsCount: Observable<Int>
    let rating: Observable<Int>
    let ratingStatus: Observable<RatingStatus>
    
    init(id: Int, name: String, category: String?, creationDate: Date, updateDate: Date, image: String?, text: String, commentsCount: Int, rating: Int, ratingStatus: RatingStatus) {
        self.id = id
        self.name = name
        self.category = category
        self.creationDate = creationDate
        self.updateDate = Observable(updateDate)
        self.image = Observable(image)
        self.text = Observable(text)
        self.commentsCount = Observable(commentsCount)
        self.rating = Observable(rating)
        self.ratingStatus = Observable(ratingStatus)
    }
    
    static func stub() -> Article {
        return .init(id: 0,
                     name: "Text article title",
                     category: "Test category",
                     creationDate: Date(),
                     updateDate: Date(),
                     image: nil,
                     text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
                     commentsCount: 3,
                     rating: 23,
                     ratingStatus: .none)
    }
}
