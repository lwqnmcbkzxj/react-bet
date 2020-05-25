//
//  BookmakerViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class BookmakerViewModel {
    
    var dataChanged: (() -> Void)?
    
    @LazyInjected
    private var bookmakerService: IBookmakerService
    
    private(set) var bookmaker: Bookmaker {
        didSet {
            dataChanged?()
        }
    }
    
    init(bookmaker: Bookmaker) {
        self.bookmaker = bookmaker
        
        bookmakerService.bookmaker(id: bookmaker.id) { (result) in
            switch result {
            case .success(let bookmaker): self.bookmaker = bookmaker
            case .failure(let err): print(err)
            }
        }
    }
}
