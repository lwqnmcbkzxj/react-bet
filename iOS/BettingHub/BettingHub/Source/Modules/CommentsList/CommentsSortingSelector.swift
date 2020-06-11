//
//  CommentsSortingSelector.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class CommentsSortingSelector: UnderlineSelector {
    
    let sortings: [CommentsSorting] = [.byRating, .byTime]
    
    init() {
        super.init(frame: .zero)
        
        setItems(sortings.map { $0.rawValue.localized })
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
