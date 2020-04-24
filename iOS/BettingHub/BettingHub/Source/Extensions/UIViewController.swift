//
//  UIViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UIViewController {
    
    func setView(_ view: UIView, insets: UIEdgeInsets = .zero) {
        self.view.addSubview(view)
        view.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(insets.left)
            make.trailing.equalToSuperview().offset(-insets.right)
            
            //kostyl'
            if let backView = self.view.subviews.first(where: { type(of: $0) === NavigationBackView.self }) {
                make.top.equalTo(backView.snp.bottom).offset(insets.top)
                self.view.bringSubviewToFront(backView)
            } else {
                make.top.equalTo(topLayoutGuide.snp.bottom).offset(insets.top)
            }
            
            make.bottom.equalTo(bottomLayoutGuide.snp.top).offset(-insets.bottom)
        }
    }
}
