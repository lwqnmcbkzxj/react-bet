//
//  UIView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

//private class SafeLayout: UILayoutGuide {}

//extension UIView {
//
//    static var statusHeight: CGFloat {
//        UIApplication.shared.statusBarFrame.height
//    }
//
//    var safeLayout: UILayoutGuide {
//        var existingLayout = layoutGuides.first(where: {($0 as? SafeLayout) != nil})
//        if existingLayout != nil {
//            return existingLayout!
//        }
//
//        existingLayout = SafeLayout()
//        addLayoutGuide(existingLayout!)
//
//        if #available(iOS 11, *) {
//            existingLayout?.snp.makeConstraints({ (make) in
//                make.edges.equalTo(safeAreaLayoutGuide)
//            })
//        } else {
//            existingLayout?.snp.makeConstraints({ (make) in
//                make.top.equalTo(topLayoutGuide.bottom)
//            })
//        }
//
//        return existingLayout!
//    }
//}
