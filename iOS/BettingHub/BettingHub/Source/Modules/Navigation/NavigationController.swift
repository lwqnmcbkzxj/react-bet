//
//  NavigationController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class NavigationController: UINavigationController {
    
    override init(rootViewController: UIViewController) {
        super.init(navigationBarClass: BettingNavigationBar.self, toolbarClass: nil)
        navigationBar.tintColor = .clear
        pushViewController(rootViewController, animated: false)
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
}

extension UIViewController {
    
    var backView: NavigationBackView? {
        return view.subviews.first { (view) -> Bool in
            return (view as? NavigationBackView) != nil
        } as? NavigationBackView
    }
    
    func addBackView(text: String?) {
        let backView = self.backView(text: text)
        view.addSubview(backView)
        
        let height = 36
        backView.snp.makeConstraints { (make) in
            make.top.equalTo(topLayoutGuide.snp.bottom)
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(height)
        }
    }
    
    private func backView(text: String?) -> UIView {
        let backView = NavigationBackView(text: text)
        backView.backGesture.addTarget(self, action: #selector(goBack))
        return backView
    }
    
    @objc private func goBack() {
        navigationController?.popViewController(animated: true)
    }
}
