//
//  IMatchService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

typealias ServiceResult<T> = Result<T, BHError>
typealias ServiceCallback<T> = (ServiceResult<T>) -> Void

protocol IMatchService: class {
    
    func matches(page: Int, count: Int,
                 callback: (ServiceCallback<[Match]>)?)
    
    func match(id: Int,
               callback: (ServiceCallback<Match>)?)
}
