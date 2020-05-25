//
//  SettingsView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 04.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import AloeStackView

class SettingsView: UIView {
    
    private let aloeStack: AloeStackView = {
        let view = AloeStackView()
        view.axis = .vertical
        view.hidesSeparatorsByDefault = true
        view.rowInset = .init(top: 0, left: 15, bottom: 10, right: 15)
        view.canCancelContentTouches = true
        view.contentInset = .init(top: 15, left: 0, bottom: 15, right: 0)
        return view
    }()
    
    private let topPanel: UIView = {
        let view = UIView()
        view.backgroundColor = .clear
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.borderWidth = 1
        view.layer.cornerRadius = 7
        return view
    }()
    
    let profileImageView: UIImageView = {
        let view = UIImageView()
        view.layer.cornerRadius = 5
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.borderWidth = 1
        view.layer.masksToBounds = true
        view.makeBordered()
        return view
    }()
    
    let nicknameLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 24)
        view.text = "Nickname"
        return view
    }()
    
    private let bankTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 14)
        view.text = "\(Text.BANK):"
        return view
    }()
    
    let bankLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 14)
        return view
    }()
    
    private let settingsButton: UIButton = {
        let view = UIButton()
        let image = UIImage(named: "filtersIcon")?.withRenderingMode(.alwaysTemplate)
        view.tintColor = .mainOrange
        view.setImage(image, for: .normal)
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 3
        view.layer.borderWidth = 1
        view.isUserInteractionEnabled = false
        return view
    }()
    
    let rateButton: UIButton = {
        let view = UIButton(type: .system)
        view.backgroundColor = .white
        view.layer.cornerRadius = 7
        view.layer.shadowOpacity = 0.1
        view.layer.shadowOffset = .zero
        view.layer.shadowRadius = 5
        view.titleLabel?.font = .robotoMedium(size: 16)
        view.titleLabel?.textColor = .titleBlack
        view.setTitle(Text.rateApp, for: .normal)
        view.setTitleColor(.titleBlack, for: .normal)
        return view
    }()
    
    let langSelector: LanguageSelector = {
        let view = LanguageSelector()
        return view
    }()
    
    private let personalLabel: UILabel = {
        let view = UIItems.settingsSectionLabel
        view.text = Text.settingsPersonalData
        return view
    }()
    
    let emailInput: InputView = {
        let view = InputView()
        view.label.text = "E-mail"
        return view
    }()
    
    private let socialLabel: UILabel = {
        let view = UIItems.settingsSectionLabel
        view.text = Text.settingsAttachedAccounts
        return view
    }()
    
    private(set) lazy var googleButton: SocialAccountView = {
        let view = SocialAccountView(network: .google)
        return view
    }()
    
    private(set) lazy var facebookButton: SocialAccountView = {
        let view = SocialAccountView(network: .facebook)
        return view
    }()
    
    private(set) lazy var vkButton: SocialAccountView = {
        let view = SocialAccountView(network: .vk)
        return view
    }()
    
    private let passwordChangeLabel: UILabel = {
        let view = UIItems.settingsSectionLabel
        view.text = Text.settingsChangePassword
        return view
    }()
    
    let passwordInput: InputView = {
        let view = InputView()
//        view.label.text = Text.newPassword
        return view
    }()
    
    let confirmPasswordInput: InputView = {
        let view = InputView()
//        view.label.text = Text.confirmPass
        return view
    }()
    
    let saveButton: BottomButton = {
        let view = BottomButton()
        view.setTitle(Text.settingsSaveChanges, for: .normal)
        return view
    }()
    
    private let notificationsLabel: UILabel = {
        let view = UIItems.settingsSectionLabel
        view.text = Text.settingsNotifications
        return view
    }()
    
    let emailNotificationsSwitcher: SettingsSwitcherView = {
        let view = SettingsSwitcherView()
        view.label.text = Text.settingsEmailNotifications
        return view
    }()
    
    let pushNotificationsSwitcher: SettingsSwitcherView = {
        let view = SettingsSwitcherView()
        view.label.text = Text.settingsPushNotifications
        return view
    }()
    
    let repliesSwitcher: SettingsSwitcherView = {
        let view = SettingsSwitcherView()
        view.label.text = Text.settingsReplies
        return view
    }()
    
    let exitButton: BottomButton = {
        let view = BottomButton(whiteStyle: true)
        view.setTitleColor(.negativeRed, for: .normal)
        view.setTitle(Text.exit, for: .normal)
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with userInfo: UserInfo) {
        profileImageView.setImage(url: userInfo.forecaster.avatar)
        nicknameLabel.text = userInfo.forecaster.login
        bankLabel.text = String(userInfo.forecaster.balance ?? 0)
    }
    
    private func makeLayout() {
        addSubview(aloeStack)
        aloeStack.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        add(item: buildPanel(), itemHeight: 77, additionalTopInset: 0, itemWidth: nil)
//        add(item: rateButton, itemHeight: 45, additionalTopInset: 12, itemWidth: nil)
//        add(item: langSelector, itemHeight: 33, additionalTopInset: 22,itemWidth: 160)
//        add(item: personalLabel, itemHeight: 24, additionalTopInset: 14, itemWidth: nil)
//        add(item: emailInput, itemHeight: 76, additionalTopInset: 0, itemWidth: nil)
//        add(item: socialLabel, itemHeight: 24, additionalTopInset: 19, itemWidth: nil)
//        add(item: socialContainer(), itemHeight: 89, additionalTopInset: 0, itemWidth: nil)
//        add(item: passwordChangeLabel, itemHeight: 24, additionalTopInset: 19, itemWidth: nil)
//        add(item: passwordInput, itemHeight: 76, additionalTopInset: 0, itemWidth: nil)
//        add(item: confirmPasswordInput, itemHeight: 76, additionalTopInset: 0, itemWidth: nil)
//        add(item: saveButton, itemHeight: 40, additionalTopInset: 21, itemWidth: nil)
//        add(item: notificationsLabel, itemHeight: 24, additionalTopInset: 28, itemWidth: nil)
//        add(item: emailNotificationsSwitcher, itemHeight: 21, additionalTopInset: 9, itemWidth: nil)
//        add(item: pushNotificationsSwitcher, itemHeight: 21, additionalTopInset: 9, itemWidth: nil)
//        add(item: repliesSwitcher, itemHeight: 21, additionalTopInset: 9, itemWidth: nil)
        add(item: exitButton, itemHeight: 45, additionalTopInset: 30, itemWidth: nil)
    }
    
    private func add(item: UIView,
                     itemHeight: CGFloat,
                     additionalTopInset: CGFloat,
                     itemWidth: CGFloat?,
                     alignment: UIView.ContentMode = .center) {
        let container = UIView()
        container.backgroundColor = .clear
        container.addSubview(item)
        item.snp.makeConstraints { (make) in
            make.bottom.equalToSuperview()
            make.top.equalToSuperview().offset(additionalTopInset)
            make.height.equalTo(itemHeight)
            make.width.equalTo(itemWidth ?? container.snp.width)
            
            switch alignment {
            case .left:
                make.leading.equalToSuperview()
            case .right:
                make.trailing.equalToSuperview()
            default:
                make.centerX.equalToSuperview()
            }
        }
        
        aloeStack.addRow(container)
    }
    
    private func socialContainer() -> UIView {
        let container = UIView()
        container.backgroundColor = .clear
        
        container.addSubview(googleButton)
        googleButton.snp.makeConstraints { (make) in
            make.leading.top.equalToSuperview()
            make.height.equalTo(40)
        }
        
        container.addSubview(facebookButton)
        facebookButton.snp.makeConstraints { (make) in
            make.leading.bottom.equalToSuperview()
            make.top.equalTo(googleButton.snp.bottom).offset(9)
            make.height.equalTo(40)
        }
        
        container.addSubview(vkButton)
        vkButton.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(facebookButton)
            make.leading.equalTo(facebookButton.snp.trailing).offset(9)
        }
        
        return container
    }
    
    private func buildPanel() -> UIView {
        topPanel.addSubview(profileImageView)
        profileImageView.snp.makeConstraints { (make) in
            make.leading.top.equalToSuperview().offset(8)
            make.width.height.equalTo(54)
        }
        
        topPanel.addSubview(nicknameLabel)
        nicknameLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(profileImageView.snp.trailing).offset(12)
            make.top.equalTo(profileImageView)
        }
        
        let bankStack = UIStackView()
        bankStack.axis = .horizontal
        bankStack.spacing = 5
        
        bankStack.addArrangedSubview(bankTitleLabel)
        bankStack.addArrangedSubview(bankLabel)
        
        topPanel.addSubview(bankStack)
        bankStack.snp.makeConstraints { (make) in
            make.leading.equalTo(nicknameLabel)
            make.bottom.equalTo(profileImageView)
        }
        
        topPanel.addSubview(settingsButton)
        settingsButton.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(14)
            make.trailing.equalToSuperview().offset(-8)
            make.width.height.equalTo(45)
        }
        
        return topPanel
    }
}
