//
//  BookmakersViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class BookmakersViewModel {
    
    let pageSize: Int = 15
    
    //Mutable state
    
    var page: Int = 0 { didSet { pageChanged() } }
    
    // Actions
    
    var dataChanged: (()->Void)?
    
    var loadingStatusChanged: ((Bool)->Void)?
    
    //Getters
    
    var loadedPages: Int { return numberOfItems() / pageSize }
    
    func numberOfItems() -> Int { bookmakers.count }
    
    func item(for index: Int) -> Bookmaker { bookmakers[index] }
    
    //Private state
    
    private var bookmakers: [Bookmaker] = [] {
        didSet { dataChanged?() }
    }
    
    private var isLoading = false {
        didSet { loadingStatusChanged?(isLoading) }
    }
    
    //Private
    
    private var loaded: Bool = false
    
    @LazyInjected
    private var bookmakerService: IBookmakerService
    
    private func pageChanged() {
        if page > loadedPages
            && !isLoading
            && !loaded {//all loaded at once
            fetchMore()
        }
    }
    
    private func fetchMore() {
        isLoading = true
        bookmakerService.bookmakers { (result) in
            switch result {
            case .success(let bookmakers): self.bookmakers = bookmakers
            case .failure(let err): print(err.localizedDescription)
            }
            self.isLoading = false
            self.loaded = true
        }
    }
}
