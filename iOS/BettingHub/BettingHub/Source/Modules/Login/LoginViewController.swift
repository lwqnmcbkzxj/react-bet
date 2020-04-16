//
//  LoginViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

enum LoginScreenState {
    case login, register, restore
}

class LoginViewController: UIViewController {
    
    private lazy var loginView = LoginView()
    private var state: LoginScreenState = .login
    
    override func loadView() {
        view = loginView
        
        loginView.passwordButton.addTarget(self,
                                           action: #selector(passwordButtonPressed),
                                           for: .touchUpInside)
        
        loginView.authTextButton.addTarget(self,
                                           action: #selector(authTextButtonPressed),
                                           for: .touchUpInside)
        
        loginView.setForState(state)
    }
    
    @objc private func passwordButtonPressed() {
        if state == .login {
            loginView.setForState(.restore)
            state = .restore
        } else {
            loginView.setForState(.login)
            state = .login
        }
    }
    
    @objc private func authTextButtonPressed() {
        if state == .login {
            loginView.setForState(.register)
            state = .register
        } else {
            loginView.setForState(.login)
            state = .login
        }
    }
}
