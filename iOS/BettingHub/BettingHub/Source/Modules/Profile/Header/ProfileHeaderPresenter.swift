//
//  ProfileHeaderPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IProfileHeaderPresenter: class {
    
    var dataChanged: (() -> Void)? { get set }
    
    func isSelf() -> Bool
    
    func profile() -> Forecaster
    
    func selfProfile() -> Forecaster?
    
    func reload(callback: (() -> Void)?)
    
    func canSubscribe() -> Bool
    
    func subscribe(callback: ((Bool)->Void)?)
}

class ProfileHeaderPresenter {
    
    @LazyInjected
    private var userService: IUserService
    
    @LazyInjected
    private var forecasterService: IForecasterService
    
    @LazyInjected
    private var authService: IAuthService
    
    private var forecaster: Forecaster! {
        didSet {
            dataChanged?()
        }
    }
    
    init(forecaster: Forecaster?) {
        guard let forecaster = forecaster else { //should be self
            let profile = userService.currentUserInfo!.forecaster
            self.forecaster = profile
            userService.addDelegate(self)
            return
        }
        
        self.forecaster = forecaster
        userService.addDelegate(self)
    }
    
    deinit {
        userService.removeDelegate(self)
    }
    
    var dataChanged: (() -> Void)?
}

extension ProfileHeaderPresenter: IProfileHeaderPresenter {
    
    func isSelf() -> Bool {
        guard let selfProfile = self.selfProfile() else { return false }
        let isSelf = selfProfile.id == profile().id
        return isSelf
    }
    
    func profile() -> Forecaster {
        return forecaster
    }
    
    func selfProfile() -> Forecaster? {
        let profile = userService.currentUserInfo?.forecaster
        return profile
    }
    
    func reload(callback: (() -> Void)?) {
        
    }
    
    func canSubscribe() -> Bool {
        let authorized = authService.authError == nil
        return authorized && !isSelf()
    }
    
    func subscribe(callback: ((Bool) -> Void)?) {
        if !canSubscribe() { return }
        
        forecasterService.subscribe(forecaster: profile()) { (result) in
            result.onSuccess { callback?($0) }
        }
    }
}

extension ProfileHeaderPresenter: IUserServiceDelegate {
    
    func dataChanged(userService: IUserService) {
        if isSelf() {
            guard let forecaster = userService.currentUserInfo?.forecaster else { return }
            self.forecaster = forecaster
        }
    }
}
