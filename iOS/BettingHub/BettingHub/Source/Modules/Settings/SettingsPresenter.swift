//
//  SettingsPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

protocol ISettingsPresenter: class {
    
    func logOut()
}

class SettingsPresenter: ISettingsPresenter {
    
    var router: ISettingsRouter!
    
    @LazyInjected private var authService: IAuthService
    
    func logOut() {
        authService.logOut()
        router.changeToLoginScreen()
    }
    
    
}


