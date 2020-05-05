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
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(settingsView)
    }
    
    private func attachTapped(network: SocialNetwork) {
         
    }
    
    private func deattachTapped(network: SocialNetwork) {
        
    }
    
}
