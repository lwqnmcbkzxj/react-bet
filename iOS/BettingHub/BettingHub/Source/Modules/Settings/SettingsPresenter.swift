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
    
    private let authService: IAuthService
    
    init(authService: IAuthService) {
        self.authService = authService
    }
    
    func logOut() {
        authService.logOut()
        router.changeToLoginScreen()
    }
    
    
}


