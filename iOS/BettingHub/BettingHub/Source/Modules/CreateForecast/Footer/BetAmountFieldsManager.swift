//
//  BetAmountFieldsManager.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BetAmountFieldsManager: NSObject {
    
    @LazyInjected
    private var userService: IUserService
    
    weak var percentsField: UITextField? {
        didSet {
            percentsField?.addTarget(self,
                                     action: #selector(percentesChanged),
                                     for: .editingChanged)
        }
    }
    weak var currencyField: UITextField? {
        didSet {
            currencyField?.addTarget(self,
                                     action: #selector(currencyChanged),
                                     for: .editingChanged)
        }
    }
    
    let maximumPercent: Double = 5
    
    private var balance: Double {
        return userService.currentUserInfo?.forecaster.balance ?? 0
    }
    
    private var maximumCurrency: Double {
        return balance * maximumPercent
    }
    
    @objc private func percentesChanged() {
        guard let percent = cast(text: percentsField?.text) else { return }
        let currValue = balance * percent/100
        currencyField?.text = currValue.description
    }
    
    @objc private func currencyChanged() {
        guard let currValue = Double(currencyField?.text ?? "0") else { return }
        let percent = (currValue / maximumCurrency) * 100
        percentsField?.text = percent.description
    }
    
    private func cast(text: String?) -> Double? {
        guard let text = text else { return 0 }
        
        if text == "" { return 0 }
        return Double(text)
    }
}

extension BetAmountFieldsManager: UITextFieldDelegate {
    
    func textField(_ textField: UITextField,
                   shouldChangeCharactersIn range: NSRange,
                   replacementString string: String) -> Bool {
        
        let res = (textField.text as NSString?)?
            .replacingCharacters(in: range, with: string) ?? string
        
        if res == "" {
            
            return true
        }
        
        if textField == percentsField {
            if let futureValue = Double(res) {
                return futureValue < maximumPercent
            }
            
        } else if textField == currencyField {
            if let futureValue = Double(res) {
                return futureValue < maximumCurrency
            }
        }
        
        return false
    }
}
