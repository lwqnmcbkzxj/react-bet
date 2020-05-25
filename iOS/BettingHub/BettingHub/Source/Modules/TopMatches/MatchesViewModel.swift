//
//  MatchesViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class MatchesViewModel {
    
    let pageSize: Int = 15
    
    //Mutable state
    
    var page: Int = 0 { didSet { pageChanged() } }
    
    // Actions
    
    var dataChanged: (()->Void)?
    
    var loadingStatusChanged: ((Bool)->Void)?
    
    //Getters
    
    var loadedPages: Int { return numberOfItems() / pageSize }
    
    func numberOfItems() -> Int { matches.count }
    
    func item(for index: Int) -> Match { matches[index] }
    
    //Private state
    
    private var matches: [Match] = [] {
        didSet { dataChanged?() }
    }
    
    private var isLoading = false {
        didSet { loadingStatusChanged?(isLoading) }
    }
    
    //Private
    
    @LazyInjected
    private var matchService: IMatchService
    
    private func pageChanged() {
        if page > loadedPages && !isLoading {
            fetchMore()
        }
    }
    
    private func fetchMore() {
        isLoading = true
        self.matchService.matches(page: self.page,
                                  count: self.pageSize)
        { (result) in
            switch result {
            case .success(let newMatches):
                self.matches += newMatches
                
            case .failure(let err):
                print(err.localizedDescription)
            }
            
            self.isLoading = false
        }
    }
}
