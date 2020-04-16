//
//  UITextField.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UITextField {
    
    func makeForPassword(new: Bool) {
        if #available(iOS 12, *) {
            textContentType = new ? .newPassword : .password
        } else if #available(iOS 11, *) {
            textContentType = .password
        }
    }
    
    func makeForUsername() {
        if #available(iOS 11, *) {
            textContentType = .username
        } else {
            textContentType = .emailAddress
        }
    }
    
    func makeForEmail() {
        textContentType = .emailAddress
    }
}
