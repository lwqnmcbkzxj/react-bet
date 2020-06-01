//
//  IPersistantDefaultsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IPersistantDefaultsService: class {
    
    func save<T: Codable>(_ data: T)
    func get<T: Codable>(_ dataType: T.Type) -> T?
}
