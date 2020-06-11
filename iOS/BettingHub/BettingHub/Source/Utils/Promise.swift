//
//  Promise.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class Promise<Data> {
    
    private var obs: Observable<Data?>? = Observable(nil)
    
    private var completeBind: ObservableBind?
    
    func fullfil(with data: Data) {
        obs?.data = data
    }
    
    @discardableResult
    func onComplete(callback: ((Data) -> Void)?) -> Promise<Data> {
        guard
            let callback = callback,
            let bind = obs?.bind(callback: { (data) in
                if let data = data {
                    callback(data)
                } else {
                    print("data nil")
                }
                self.destroy()
            })
        else { return self }
        
        completeBind = bind
        
        return self
    }
    
    private func destroy() {
        obs = nil
        completeBind = nil
        print("destoyed")
    }
}
