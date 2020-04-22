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
        if #available(iOS 11, *) {
            view.snp.makeConstraints { (make) in
                make.top.equalToSuperview().offset(insets.top)
                make.leading.equalToSuperview().offset(insets.left)
                make.trailing.equalToSuperview().offset(-insets.right)
                make.bottom.equalToSuperview().offset(-insets.bottom)
            }
        } else {
            view.snp.makeConstraints { (make) in
                make.leading.equalToSuperview().offset(insets.left)
                make.trailing.equalToSuperview().offset(-insets.right)
                make.top.equalTo(topLayoutGuide.snp.bottom).offset(-insets.bottom)
                make.bottom.equalTo(bottomLayoutGuide.snp.top).offset(insets.top)
            }
        }
    }
}
