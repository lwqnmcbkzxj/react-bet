//
//  UIViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UIViewController {
    
    func setView(_ view: UIView) {
        self.view.addSubview(view)
        if #available(iOS 11, *) {
            view.snp.makeConstraints { (make) in
                make.edges.equalToSuperview()
            }
        } else {
            view.snp.makeConstraints { (make) in
                make.leading.trailing.equalToSuperview()
                make.top.equalTo(topLayoutGuide.snp.bottom)
                make.bottom.equalTo(bottomLayoutGuide.snp.top)
            }
        }
    }
}
