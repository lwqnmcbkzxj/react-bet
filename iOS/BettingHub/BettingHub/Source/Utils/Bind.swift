//
//  Bind.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class Observable<Data> {
    
    var data: Data {
        didSet { binds.forEach { $0(data) } }
    }
    
    private var binds: [(Data) -> Void] = []
    
    init(_ data: Data) {
        self.data = data
    }
    
    func bind(callback: @escaping (Data) -> Void) {
        binds.append(callback)
    }
}
