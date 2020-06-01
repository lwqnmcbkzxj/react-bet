//
//  CreateForecastHeaderInteractor.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ICreateForecastHeaderInteractor: class {
    
    func loadBookmakers(callback: (([Bookmaker]?) -> Void)?)
    
    func loadSports(bookmaker: Bookmaker, callback: (([Sport]?) -> Void)?)
    
    func loadChampionships(bookmaker: Bookmaker,
                           sport: Sport,
                           callback: (([Championship]?) -> Void)?)
    
    func loadMatches(bookmaker: Bookmaker,
                     sport: Sport,
                     championship: Championship,
                     callback: (([Match]?) -> Void)?)
}

class CreateForecastHeaderInteractor: ICreateForecastHeaderInteractor {
    
    func loadBookmakers(callback: (([Bookmaker]?) -> Void)?) {
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let items = (0..<10).map { (_) in Bookmaker.stub() }
            callback?(items)
        }
    }
    
    func loadSports(bookmaker: Bookmaker,
                    callback: (([Sport]?) -> Void)?) {
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let items = (0..<10).map { (_) in Sport.stub() }
            callback?(items)
        }
    }
    
     func loadChampionships(bookmaker: Bookmaker,
                            sport: Sport,
                            callback: (([Championship]?) -> Void)?) {
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let items = (0..<10).map { (_) in Championship.stub() }
            callback?(items)
        }
    }
    
     func loadMatches(bookmaker: Bookmaker,
                      sport: Sport,
                      championship: Championship,
                      callback: (([Match]?) -> Void)?) {
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let items = (0..<10).map { (_) in Match.stub() }
            callback?(items)
        }
    }
}
