//
//  Result.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

extension Result {
    
    @discardableResult
    func onSuccess(_ completion: (Success) -> Void) -> Result<Success, Failure> {
        switch self {
        case .success(let succ):
            completion(succ)
        default:
            break
        }
        
        return self
    }
    
    @discardableResult
    func onFailure(_ completion: (Failure) -> Void) -> Result<Success, Failure> {
        switch self {
        case .failure(let err):
            completion(err)
        default:
            break
        }
        
        return self
    }
    
    func invokeCallback(_ callback: (Result<Success, Failure>) -> Void) {
        callback(self)
    }
}
