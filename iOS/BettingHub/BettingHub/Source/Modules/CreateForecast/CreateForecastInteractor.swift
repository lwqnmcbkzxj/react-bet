//
//  CreateForecastInteractor.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ICreateForecastInteractor: class {
    
    var betsData: Observable<[BetsTableData]> { get }
    
    func loadBetsData(bookmaker: Bookmaker, match: Match)
}

class CreateForecastInteractor: ICreateForecastInteractor {
    
    let betsData = Observable<[BetsTableData]>([])
    
    func loadBetsData(bookmaker: Bookmaker, match: Match) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let data = (0..<3).map { (_) in self.mockData() }
            self.betsData.data = data
        }
    }
    
    private func mockData() -> BetsTableData {
        BetsTableData(bookmakers: [.stub()], columns: ["Bet1", "Bet2"], values: [[10, 20]])
    }
}
