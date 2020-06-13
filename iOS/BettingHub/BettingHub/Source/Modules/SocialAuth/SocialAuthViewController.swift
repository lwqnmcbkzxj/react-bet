//
//  SocialAuthViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 12.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import WebKit

class SocialAuthViewController: UIViewController {
    
    var presenter: ISocialAuthPresenter!
    
    private lazy var webView = WKWebView()
    
    override func loadView() {
        view = webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        webView.load(presenter.webPageRequest())
    }
}

