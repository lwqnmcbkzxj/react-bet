//
//  MainViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainViewController: UIViewController {
    
    private lazy var mainView = MainView()
    
    override func loadView() {
        view = mainView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Hello"
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
    }
}
