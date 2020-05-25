//
//  ProfileInteractor.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IProfileInteractor: class {
    
    func isSelf() -> Bool
    
    func selfProfile() -> UserInfo?
    
    func profile() -> Forecaster
    
    func loadData(callback: (()->Void)?)
}

class ProfileInteractor: IProfileInteractor {
    
    @LazyInjected
    private var userService: IUserService
    
    @LazyInjected
    private var forecasterService: IForecasterService
    
    private var forecaster: Forecaster!
    
    init(forecaster: Forecaster?) {
        guard let forecaster = forecaster else {
            //init with self
            self.forecaster = userService.currentUserInfo!.forecaster
            return
        }
        
        self.forecaster = forecaster
    }
    
    func isSelf() -> Bool {
        guard let selfId = userService.currentUserInfo?.forecaster.id else {
            return false
        }
        
        return profile().id == selfId
    }
    
    func profile() -> Forecaster {
        return forecaster
    }
    
    func selfProfile() -> UserInfo? {
        return userService.currentUserInfo
    }
    
    func loadData(callback: (() -> Void)?) {
        forecasterService.forecaster(id: profile().id) { (result) in
            switch result {
            case .success(let forecaster):
                self.forecaster = forecaster
                callback?()
                
            case .failure(let err):
                print(err)
            }
        }
    }
}
