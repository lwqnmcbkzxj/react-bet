//
//  SelectionInputView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SelectionInputView: InputView {
    
    private(set) var items: [String] = []
    
    private(set) var selectedIndex: Int?
    
    private lazy var picker: UIPickerView = {
        let picker = UIPickerView()
        picker.dataSource = self
        picker.delegate = self
        return picker
    }()
    
    override init() {
        super.init()
        textField.inputView = picker
        
        let arrowImage = UIImage(named: "hideArrow")!
        let arrowView = UIImageView(image: arrowImage)
        textField.rightView = arrowView
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension SelectionInputView: UIPickerViewDataSource {
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return items.count
    }
}

extension SelectionInputView: UIPickerViewDelegate {
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return items[row]
    }
}
