//
//  ISportService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 13.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

protocol ISportService: class {

    var currentSports: [Sport] { get }
    
    func updateKnownSports(callback: @escaping ()->Void)
}
