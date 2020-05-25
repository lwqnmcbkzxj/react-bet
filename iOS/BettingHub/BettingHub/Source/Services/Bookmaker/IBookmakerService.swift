//
//  IBookmakerService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IBookmakerService: class {
    
    func bookmakers(callback: (ServiceCallback<[Bookmaker]>)?)
    
    func bookmaker(id: Int, callback: (ServiceCallback<Bookmaker>)?)
}
