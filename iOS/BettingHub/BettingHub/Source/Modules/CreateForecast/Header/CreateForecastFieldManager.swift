//
//  CreateForecastFieldManager.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

enum CreateForecastField {
    case matchSearch
    case bookmaker
    case sportKind
    case championship
    case match
    case date
    case time
}

class CreateForecastFieldManager: NSObject {
    
    let field: CreateForecastField
    
    var textFieldEditable: (()->Bool)?
    
    var dataChanged: ((CreateForecastField)->Void)?
    
    var editingStart: ((CreateForecastField) -> Void)?
    
    private weak var textField: UITextField?
    
    init(field: CreateForecastField) {
        self.field = field
    }
    
    func attach(textField: UITextField) {
        self.textField = textField
        textField.addTarget(self, action: #selector(textChanged(sender:)), for: .editingChanged)
        textField.delegate = self
    }
    
    @objc private func textChanged(sender: UITextField) {
        dataChanged?(field)
    }
    
    var text: String {
        return textField?.text ?? ""
    }
    
    func setText(text: String) {
        textField?.text = text
    }
    
    private var originalRightView: UIView?
    func showLoading(_ isLoading: Bool) {
        if isLoading {
            originalRightView = textField?.rightView
            textField?.rightView = loadingView()
        } else {
            textField?.rightView = originalRightView
        }
    }
    
    private func loadingView() -> UIView {
        let indicator = UIActivityIndicatorView()
        indicator.color = .mainOrange
        indicator.startAnimating()
        return indicator
    }
}

extension CreateForecastFieldManager: UITextFieldDelegate {
    
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        return textFieldEditable?() ?? false
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        editingStart?(field)
    }
}
