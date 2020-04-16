//
//  LoginView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SnapKit

class LoginView: UIView {
    
    private let loginLabel: UILabel = {
        let label = UILabel()
        label.textAlignment = .center
        label.text = Text.loginTitle
        label.textColor = .black
        label.font = UIFont.robotoMedium(size: 24)
        return label
    }()
    
    private let usernameInput: InputView = {
        let input = InputView()
        input.label.text = Text.yourNickname
        input.textField.makeForUsername()
        return input
    }()
    
    private let mailInput: InputView = {
        let input = InputView()
        input.label.text = Text.yourMailOrNick
        input.textField.keyboardType = .emailAddress
        input.textField.makeForUsername()
        return input
    }()
    
    private let passwordInput: InputView = {
        let input = InputView()
        input.label.text = Text.password
        input.textField.makeForPassword(new: false)
        return input
    }()
    
    private let confirmPasswordInput: InputView = {
        let input = InputView()
        input.label.text = Text.confirmPass
        input.textField.makeForPassword(new: false)
        return input 
    }()
    
    let loginButton: UIButton = {
        let button = BottomButton()
        button.setTitle(Text.login, for: .normal)
        return button
    }()
    
    private let separatorView: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        
        let label = UILabel()
        label.textAlignment = .center
        label.text = Text.or
        label.backgroundColor = .white
        label.textColor = .textGray
        
        view.addSubview(label)
        
        label.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.centerY.equalToSuperview().offset(-1.5)
            make.width.equalTo(56)
        }
        
        return view
    }()
    
    let googleButton: UIButton = {
        let button = SocialButton(network: .google)
        button.setTitle(Text.loginWithGoogle, for: .normal)
        return button
    }()
    
    let facebookButton: UIButton = SocialButton(network: .facebook)
    
    let vkButton: UIButton = SocialButton(network: .vk)
    
    let passwordButton: UIButton = {
        let button = UIItems.authTextButton
        button.setTitle(Text.forgetPass, for: .normal)
        return button
    }()
    
    private let accountLabel: UILabel = {
        let label = UILabel()
        label.textColor = .textGray
        label.text = Text.noAccount
        label.textAlignment = .right
        return label
    }()
    
    let authTextButton: UIButton = {
        let button = UIItems.authTextButton
        button.titleLabel?.textAlignment = .left
        button.setTitle(Text.register, for: .normal)
        return button
    }()
    
    init() {
        super.init(frame: .zero)
        backgroundColor = .white
        makeLayout()
        configureView()
        enableErrorShowing()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setForState(_ state: LoginScreenState) {
        mailInput.isHidden = state != .register
        passwordInput.isHidden = state == .restore
        confirmPasswordInput.isHidden = state != .register
        passwordButton.isHidden = state == .register
        accountLabel.isHidden = state == .restore
        authTextButton.isHidden = state == .restore
        
        switch state {
        case .login:
            loginLabel.text = Text.loginTitle
            usernameInput.label.text = Text.yourMailOrNick
            loginButton.setTitle(Text.login, for: .normal)
            googleButton.setTitle(Text.loginWithGoogle, for: .normal)
            
            passwordButton.setTitle(Text.forgetPass, for: .normal)
            accountLabel.text = Text.noAccount
            authTextButton.setTitle(Text.register, for: .normal)
        case .register:
            loginLabel.text = Text.registerTitle
            usernameInput.label.text = Text.yourNickname
            loginButton.setTitle(Text.login, for: .normal)
            googleButton.setTitle(Text.withGoogle, for: .normal)
            
            accountLabel.text = Text.haveAccount
            authTextButton.setTitle(Text.authorize, for: .normal)
        case .restore:
            loginLabel.text = Text.restoreTitle
            usernameInput.label.text = Text.yourMailOrNick
            loginButton.setTitle(Text.login, for: .normal)
            googleButton.setTitle(Text.withGoogle, for: .normal)
            
            passwordButton.setTitle(Text.authorize, for: .normal)
            accountLabel.text = Text.haveAccount
            authTextButton.setTitle(Text.authorize, for: .normal)
        }
    }
    
    private func configureView() {
        addShowButton(textField: passwordInput.textField)
            .addTarget(self, action: #selector(hidePassword), for: .touchUpInside)
        
        addShowButton(textField: confirmPasswordInput.textField)
            .addTarget(self, action: #selector(hideConfirmPassword), for: .touchUpInside)
    }
    
    private func addShowButton(textField: UITextField) -> UIButton {
        textField.isSecureTextEntry = true
        let image = UIImage(named: "eye")
        let button = UIButton()
        button.setImage(image, for: .normal)
        button.imageView?.contentMode = .scaleAspectFill
        textField.rightView = button
        textField.rightViewMode = .always
        return button
    }
    
    @objc private func hidePassword() {
        passwordInput.textField.isSecureTextEntry.toggle()
    }
    
    @objc private func hideConfirmPassword() {
        confirmPasswordInput.textField.isSecureTextEntry.toggle()
    }
    
    private func makeLayout() {
        
        addSubview(loginLabel)
        loginLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(snp.top).offset(statusHeight)
            make.height.greaterThanOrEqualTo(24)
            make.height.lessThanOrEqualTo(107)
            make.height.equalTo(107).priority(.medium)
        }
        
        let inputsStackView = UIStackView()
        inputsStackView.axis = .vertical
        inputsStackView.spacing = 14
        inputsStackView.distribution = .fillEqually
        
        addSubview(inputsStackView)
        inputsStackView.snp.makeConstraints { (make) in
            make.top.equalTo(loginLabel.snp.bottom)
            make.centerX.equalToSuperview()
            make.width.greaterThanOrEqualTo(300)
            make.width.equalTo(0.8).priority(.high)
        }
        
        inputsStackView.addArrangedSubview(usernameInput)
        usernameInput.snp.makeConstraints { (make) in
            make.height.equalTo(70).priority(999)
        }
        
        inputsStackView.addArrangedSubview(mailInput)
        mailInput.snp.makeConstraints { (make) in
            make.height.equalTo(70).priority(999)
        }
        
        inputsStackView.addArrangedSubview(passwordInput)
        passwordInput.snp.makeConstraints { (make) in
            make.height.equalTo(70).priority(999)
        }
        
        inputsStackView.addArrangedSubview(confirmPasswordInput)
        passwordInput.snp.makeConstraints { (make) in
            make.height.equalTo(70).priority(999)
        }
        
        addSubview(loginButton)
        loginButton.snp.makeConstraints { (make) in
            make.top.equalTo(inputsStackView.snp.bottom).offset(16)
            make.leading.trailing.equalTo(inputsStackView)
            make.height.equalTo(45)
        }
        
        addSubview(separatorView)
        separatorView.snp.makeConstraints { (make) in
            make.top.equalTo(loginButton.snp.bottom).offset(27)
            make.leading.trailing.equalTo(inputsStackView)
            make.height.equalTo(1)
        }
        
        addSubview(googleButton)
        googleButton.snp.makeConstraints { (make) in
            make.top.equalTo(separatorView.snp.bottom).offset(23)
            make.leading.equalTo(inputsStackView)
            make.height.equalTo(40)
        }
        
        addSubview(facebookButton)
        facebookButton.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(googleButton)
            make.leading.equalTo(googleButton.snp.trailing).offset(8)
            make.width.equalTo(facebookButton.snp.height)
        }
        
        addSubview(vkButton)
        vkButton.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(googleButton)
            make.leading.equalTo(facebookButton.snp.trailing).offset(8)
            make.width.equalTo(vkButton.snp.height)
            make.trailing.equalTo(inputsStackView)
        }
        
        addSubview(passwordButton)
        passwordButton.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.height.equalTo(20)
            make.top.greaterThanOrEqualTo(googleButton.snp.bottom)
            make.top.equalTo(googleButton.snp.bottom).offset(25).priority(.high)
        }
        
        let bottomStack = UIStackView()
        bottomStack.axis = .horizontal
        bottomStack.spacing = 10
        bottomStack.distribution = .fillProportionally
        
        addSubview(bottomStack)
        bottomStack.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalTo(passwordButton.snp.bottom)
            make.bottom.equalTo(snp.bottom).offset(-38).priority(.high)
            make.bottom.lessThanOrEqualTo(snp.bottom).offset(-16)
            make.height.equalTo(passwordButton)
        }
        
        bottomStack.addArrangedSubview(accountLabel)
        bottomStack.addArrangedSubview(authTextButton)
    }
}
