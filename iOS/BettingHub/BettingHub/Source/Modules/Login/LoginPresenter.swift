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
    
    private var isLoading: Bool = false
    
    init(authService: IAuthService) {
        self.authService = authService
    }
    
    func register(username: String, email: String, password: String, confirmPassword: String) {
        if isLoading { return }
        
        if !checkRegister(username: username, email: email,
                          password: password, confirmPassoword: confirmPassword) { return }
        
        isLoading = true
        authService.register(username: username, email: email, password: password) { (error) in
            self.isLoading = false
            if let error = error {
                self.handleError(error)
                return
            }
            print("success")
        }
        
    }
    
    func logIn(usernameOrMail: String, password: String) {
        if isLoading { return }
        
        if !checkLogIn(usernameOrEmail: usernameOrMail, password: password) { return }
        
        isLoading = true
        authService.logIn(usernameOrMail: usernameOrMail, password: password) { (err) in
            self.isLoading = false
            if let err = err {
                self.handleError(err)
                return
            }
            self.router.proceed()
        }
    }
}

private extension LoginPresenter {
    
    private func checkRegister(username: String, email: String,
                               password: String, confirmPassoword: String) -> Bool {
        if username.isEmpty
            || email.isEmpty
            || password.isEmpty
            || confirmPassoword.isEmpty {
            vc.fieldsEmpty()
        }
        
        if password != confirmPassoword {
            vc.unmatchingPasswords()
            return false
        }
        return true
    }
    
    private func checkLogIn(usernameOrEmail: String, password: String) -> Bool {
        if usernameOrEmail.isEmpty || password.isEmpty {
            vc.fieldsEmpty()
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
