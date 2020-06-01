//
//  CreateForecastAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CreateForecastAssembly: IModuleAssembly {
    
    static let shared = CreateForecastAssembly()
    
    private lazy var viewController = CreateForecastViewController()
    
    lazy private(set) var container: DependanciesContainer = {
        let container = DependanciesContainer()
        
        container.register(ICreateForecastHeaderInteractor.self,
                           registrationBlock: CreateForecastHeaderInteractor.init)
        
        container.register(ICreateForecastHeaderPresenter.self,
                           registrationBlock: CreateForecastHeaderPresenter.init)
        
        container.register(TableSectionProvider.self) {
            CreateForecastTableProvider(tableView: viewController.tableView)
        }
        
        container.register(ICreateForecastPresenter.self,
                           registrationBlock: CreateForecastPresenter.init)
        
        container.register(ICreateForecastInteractor.self,
                           registrationBlock: CreateForecastInteractor.init)
        
        return container
    }()
    
    private init() {}
    
    func screen() -> UIViewController { viewController }
}
