//
//  Injected.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 13.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

@propertyWrapper
struct LazyInjected<Service> {
    
    private lazy var service = ServiceLocator.shared.resolve(Service.self)
    
    var wrappedValue: Service {
        mutating get { return service }
        mutating set { service = newValue }
    }
}
