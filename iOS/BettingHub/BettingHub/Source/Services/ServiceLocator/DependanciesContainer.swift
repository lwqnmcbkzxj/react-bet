//
//  DependanciesContainer.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class DependanciesContainer {
    private var resolutionsMap: [String: Any] = [:]
    
    func register<Interface>(_ interface: Interface.Type, registrationBlock: ()->Interface) {
        let id = String(describing: interface)
        let implementation = registrationBlock()
        resolutionsMap[id] = implementation
    }
    
    func resolve<Interface>(_ interface: Interface.Type) -> Interface? {
        let id = String(describing: interface)
        return resolutionsMap[id] as? Interface
    }
}
