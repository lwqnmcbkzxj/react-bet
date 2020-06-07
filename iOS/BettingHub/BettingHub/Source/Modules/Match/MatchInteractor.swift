//
//  MatchInteractor.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IMatchInteractor: class {
    
    var match: Observable<Match> { get }
    
    func reloadMatchData()
}

class MatchInteractor: IMatchInteractor {
    
    @LazyInjected
    private var matchService: IMatchService
    
    let match: Observable<Match>
    
    init(match: Match) {
        self.match = Observable(match)
    }
    
    func reloadMatchData() {
        matchService.match(id: match.data.id) { (result) in
            result.onSuccess { (match) in
                self.match.data = match
            }.onFailure { (err) in
                print(err)
            }
        }
    }
}
