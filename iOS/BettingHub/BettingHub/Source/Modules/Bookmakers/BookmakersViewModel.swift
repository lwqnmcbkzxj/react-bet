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
    
    private func pageChanged() {
        if page > loadedPages && !isLoading {
            fetchMore()
        }
    }
    
    private func fetchMore() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            self.bookmakers += (0..<self.pageSize).map { _ in Bookmaker.stub() }
            self.isLoading = false
        }
    }
}
