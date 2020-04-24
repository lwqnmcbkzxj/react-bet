//
//  LoginViewPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ILoginPresenter: class {
    
    func register(username: String, email: String, password: String, confirmPassword: String)
    
    func logIn(usernameOrMail: String, password: String)
}

class LoginPresenter: ILoginPresenter {
    
    weak var vc: ILoginViewController!
    var router: ILoginRouter!
    
    let authService: IAuthService
    
    init(authService: IAuthService) {
        self.authService = authService
    }
    
    func register(username: String, email: String, password: String, confirmPassword: String) {
        if check(username: username, email: email,
                 password: password, confirmPassoword: confirmPassword) {
            authService.register(username: username, email: email, password: password) { (error) in
                if let error = error {
                    self.handleError(error)
                    return
                }
                print("success")
            }
        }
    }
    
    func logIn(usernameOrMail: String, password: String) {
        authService.logIn(usernameOrMail: usernameOrMail, password: password) { (err) in
            if let err = err {
                self.handleError(err)
                return
            }
            self.router.proceed()
        }
    }
}

private extension LoginPresenter {
    
    private func check(username: String, email: String, password: String, confirmPassoword: String) -> Bool {
        if password != confirmPassoword {
            vc?.unmatchingPasswords()
            return false
        }
        return true
    }
    
    private func handleError(_ err: BHError) {
        switch err {
        case .userAlreadyRegistered:
            vc.userAlreadyRegistered()
        default:
            vc.unspecifiedError()
        }
    }
}
