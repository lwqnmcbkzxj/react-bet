//
//  UnifyingStorage.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 07.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ApiObject {
    associatedtype Object: AnyObject
    
    var id: Int { get }
    
    func applyChanges(to object: Object)
    
    func createObject() -> Object
}

class UnifyingStorage<Model, Object: ApiObject> where Object.Object == Model {
    
    private var models: [Int: Model] = [:] //contains model for given id
    
    func model(id: Int) -> Model? {
        return models[id]
    }
    
    @discardableResult
    func createOrUpdate(obj: Object) -> Model {
        if let model = self.models[obj.id] {
            obj.applyChanges(to: model)
            return model
        } else {
            let model = obj.createObject()
            models[obj.id] = model
            return model
        }
    }
}
