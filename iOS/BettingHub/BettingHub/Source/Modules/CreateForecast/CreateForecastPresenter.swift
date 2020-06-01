//
//  CreateForecastPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ICreateForecastPresenter: class {
    
    var betsData: Observable<[BetsTableData]> { get }
    
    var bookmaker: Bookmaker? { get set }
    var match: Match? { get set }
}

class CreateForecastPresenter: ICreateForecastPresenter {
    
    @ModuleDependency(assembly: CreateForecastAssembly.shared)
    private var interactor: ICreateForecastInteractor
    
    var betsData = Observable<[BetsTableData]>([])
    
    var bookmaker: Bookmaker?
    
    var match: Match? {
        didSet {
            guard
                let bookmaker = bookmaker,
                let match = match
            else {
                betsData.data = []
                return
            }
            setupBinds()
            interactor.loadBetsData(bookmaker: bookmaker,
                                    match: match)
        }
    }
    
    private func setupBinds() {
        interactor.betsData.bind { (data) in
            self.betsData.data = data
        }
    }
}
