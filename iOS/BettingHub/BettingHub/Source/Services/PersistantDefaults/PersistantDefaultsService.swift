//
//  PersistantDefaultsService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class PersistantDefaultsService {
    
}

extension PersistantDefaultsService: IPersistantDefaultsService {
    
    func save<T: Codable>(_ data: T) {
        guard let encoded = try? JSONEncoder().encode(data) else {
            print("couldn't save \(T.self)")
            return
        }
        let key = String(describing: T.self)
        UserDefaults.standard.set(encoded, forKey: key)
    }
    
    func get<T: Codable>(_ dataType: T.Type) -> T? {
        let key = String(describing: T.self)
        
        guard
            let data = UserDefaults.standard.value(forKey: key) as? Data
        else {
            print("didn't find persisted \(T.self)")
            return nil
        }
        
        guard
            let decoded = try? JSONDecoder().decode(dataType, from: data)
        else {
            print("couldn't decode persisted for \(T.self)")
            return nil
        }
        
        return decoded
    }
}
