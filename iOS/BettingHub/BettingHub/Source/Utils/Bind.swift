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
        didSet {
            binds.keys.forEach {
                binds[$0]?(data)
            }
        }
    }
    
    private var binds: [UUID: ((Data) -> Void)] = [:]
    
    init(_ data: Data) {
        self.data = data
    }
    
    func bind(callback: @escaping (Data) -> Void) -> ObservableBind {
        let id = UUID()
        
        let bind = ObservableBind(id: id,
        close: {
            self.binds[id] = nil
        }, invoke: {
            self.binds[id]?(self.data)
        })
        
        binds[id] = callback
        
        return bind
    }
}

class ObservableBind {
    fileprivate let id: UUID
    fileprivate let closeAction: () -> Void
    fileprivate let invoke: () -> Void
    
    init(id: UUID, close: @escaping () -> Void, invoke: @escaping () -> Void) {
        self.id = id
        self.closeAction = close
        self.invoke = invoke
    }
    
    deinit {
        close()
    }
    
    func close() {
        closeAction()
    }
    
    func invoked() -> ObservableBind {
        invoke()
        return self
    }
}
