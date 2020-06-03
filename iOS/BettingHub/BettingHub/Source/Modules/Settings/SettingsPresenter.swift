//
//  SettingsPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 11.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol ISettingsPresenter: class {
    
    var dataChanged: ((UserInfo) -> Void)? { get set }
    
    func logOut()
    
    func uploadAvatar(_ image: UIImage)
}

class SettingsPresenter: ISettingsPresenter {
    
    var router: ISettingsRouter!
    
    @LazyInjected
    private var authService: IAuthService
    
    @LazyInjected
    private var userService: IUserService
    
    var dataChanged: ((UserInfo) -> Void)?
    
    init() {
        userService.addDelegate(self)
    }
    
    deinit {
        userService.removeDelegate(self)
    }
    
    func logOut() {
        authService.logOut()
        router.changeToLoginScreen()
    }
    
    func uploadAvatar(_ image: UIImage) {
        guard let data = image.pngData() else { return }
        userService.uploadAvatar(data: data)
    }
}

extension SettingsPresenter: IUserServiceDelegate {
    
    func dataChanged(userService: IUserService) {
        guard let userInfo = userService.currentUserInfo else { return }
        dataChanged?(userInfo)
    }
}

