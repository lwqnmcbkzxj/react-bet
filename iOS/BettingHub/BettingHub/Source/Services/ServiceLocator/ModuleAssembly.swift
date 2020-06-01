//
//  ModuleAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation
import UIKit

@propertyWrapper
struct ModuleDependency<Dependency> {
    
    let assembly: IModuleAssembly
    private lazy var dependency = assembly.container.resolve( unwrap(dependencyType: Dependency.self))
                                  
    
    init(assembly: IModuleAssembly) {
        self.assembly = assembly
    }
    
    var wrappedValue: Dependency {
        mutating get {
            guard let dependency = dependency else {
                fatalError("\(Dependency.self) is not registered in \(assembly)")
            }
            return dependency
        }
        mutating set { dependency = newValue }
    }
    
    private func unwrap(dependencyType: Dependency.Type) -> Dependency.Type {
        if Dependency.self is Optional<Any>.Type {
            return unwrap(dependencyType: dependencyType)
        }
        return dependencyType
    }
}

protocol IModuleAssembly: class {
    var container: DependanciesContainer { get }
    func screen() -> UIViewController
}
