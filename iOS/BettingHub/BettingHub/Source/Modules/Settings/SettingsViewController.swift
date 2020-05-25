//
//  SettingsViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 04.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController {
    
    private lazy var settingsView = SettingsView()
    
    var presenter: ISettingsPresenter!
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(settingsView)
        
        settingsView.exitButton.addTarget(self, action: #selector(exitTapped), for: .touchUpInside)
        
    }
    
    func configure(userInfo: UserInfo) {
        settingsView.configure(with: userInfo)
    }
    
    private func attachTapped(network: SocialNetwork) {
         
    }
    
    private func deattachTapped(network: SocialNetwork) {
        
    }
    
    @objc private func exitTapped() {
        presenter.logOut()
    }
    
}
