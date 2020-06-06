//
//  IForecasterService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IForecasterService: class {
    
    func handledForecaster(id: Int) -> Forecaster?
    
    @discardableResult
    func createOrUpdate(obj: ForecasterApiObject) -> Forecaster
    
    func topForecasters(page: Int, count: Int,
                        sport: Sport, time: TimeFrame,
                        callback: ((Result<[Forecaster], BHError>) -> Void)?)
    
    func forecaster(id: Int,
                    callback: ((Result<Forecaster, BHError>) -> Void)?)
    
    func subscribe(forecaster: Forecaster)
}
