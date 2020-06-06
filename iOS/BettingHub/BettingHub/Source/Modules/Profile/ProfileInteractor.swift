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
        self.forecaster = forecaster ?? userService.currentUserInfo.forecaster.data!
    }
    
    func isSelf() -> Bool {
        guard let selfId = userService.currentUserInfo.forecaster.data?.id else {
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
