//
//  ProfileHeaderPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IProfileHeaderPresenter: class {
    
    func isSelf() -> Bool
    
    func profile() -> Forecaster
    
    func selfProfile() -> Forecaster?
    
    func reload()
    
    func canSubscribe() -> Bool
    
    func subscribe()
    
    func storeBinds(_ binds: [ObservableBind])
}

class ProfileHeaderPresenter {
    
    @LazyInjected
    private var userService: IUserService
    
    @LazyInjected
    private var forecasterService: IForecasterService
    
    @LazyInjected
    private var authService: IAuthService
    
    private var forecaster: Forecaster!
    
    private var binds: [ObservableBind] = []
    
    init(forecaster: Forecaster?) {
        
        let forecaster = forecaster ?? userService.currentUserInfo.forecaster.data!
        self.forecaster = forecaster
    }
}

extension ProfileHeaderPresenter: IProfileHeaderPresenter {
    
    func storeBinds(_ binds: [ObservableBind]) {
        self.binds.forEach { $0.close() }
        self.binds = binds
    }
    
    func isSelf() -> Bool {
        guard let selfProfile = self.selfProfile() else { return false }
        let isSelf = selfProfile.id == profile().id
        return isSelf
    }
    
    func profile() -> Forecaster {
        return forecaster
    }
    
    func selfProfile() -> Forecaster? {
        let profile = userService.currentUserInfo.forecaster.data
        return profile
    }
    
    func reload() {
        
    }
    
    func canSubscribe() -> Bool {
        let authorized = authService.authError == nil
        return authorized && !isSelf()
    }
    
    func subscribe() {
        if !canSubscribe() { return }
        
        forecasterService.subscribe(forecaster: forecaster)
    }
}
