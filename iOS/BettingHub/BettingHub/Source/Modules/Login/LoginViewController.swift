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

protocol ILoginViewController: class {
    
    func fieldsEmpty()
    
    func unmatchingPasswords()
    
    func notSuitableLogin()
    
    func notSuitablePassword()
    
    func userAlreadyRegistered()
    
    func unspecifiedError()
}

class LoginViewController: UIViewController {
    
    private lazy var loginView = LoginView()
    
    var presenter: ILoginPresenter!
    
    private var state: LoginScreenState = .login
    
    init() {
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        view.enableErrorShowing()
        
        setView(loginView)
        
        loginView.passwordButton.addTarget(self,
                                           action: #selector(passwordButtonPressed),
                                           for: .touchUpInside)
        
        loginView.authTextButton.addTarget(self,
                                           action: #selector(authTextButtonPressed),
                                           for: .touchUpInside)
        
        loginView.loginButton.addTarget(self, action: #selector(loginButtonPressed), for: .touchUpInside)
        
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
    
    @objc private func loginButtonPressed() {
        switch state {
        case .login:
            presenter.logIn(usernameOrMail: loginView.mailInput.textField.text ?? "",
                            password: loginView.passwordInput.textField.text ?? "")
        case .register:
            presenter.register(username: loginView.usernameInput.textField.text ?? "",
                               email: loginView.mailInput.textField.text ?? "",
                               password: loginView.passwordInput.textField.text ?? "",
                               confirmPassword: loginView.confirmPasswordInput.textField.text ?? "")
        case .restore:
            break
        }
    }
}

extension LoginViewController: ILoginViewController {
    
    func fieldsEmpty() {
        view.showError(text: Text.fieldsEmptyError )
    }
    
    func unmatchingPasswords() {
        view.showError(text: Text.unmatchingPasswordsError )
    }
    
    func notSuitableLogin() {
//        view.showError(text: "notSuitableLoginText")
    }
    
    func notSuitablePassword() {
//        view.showError(text: "notSuitablePasswordText")
    }
    
    func userAlreadyRegistered() {
//        view.showError(text: "userAlreadyRegisteredText")
    }
    
    func unspecifiedError() {
        view.showError(text: Text.unspecifiedError)
    }
}
