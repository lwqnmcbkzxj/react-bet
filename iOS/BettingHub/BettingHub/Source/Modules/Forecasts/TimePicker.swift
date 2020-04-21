//
//  TimePicker.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TimePicker: UIControl {
    
    var selectedItem: Int? = nil {
        didSet {
            if let index = selectedItem {
                picker.selectRow(index, inComponent: 0, animated: false)
                textField.text = items[index]
            } else {
                textField.text = nil
            }
            sendActions(for: .valueChanged)
        }
    }
    
    let items: [String]
    
    private let panel = UIItems.grayPanel
    
    private lazy var textField: PickerTextField = {
        let view = PickerTextField()
        view.inputView = picker
        view.delegate = self
        return view
    }()
    
    private lazy var picker: UIPickerView = {
        let picker = UIPickerView()
        picker.dataSource = self
        picker.delegate = self
        return picker
    }()
    
    init(items: [String]) {
        self.items = items
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(panel)
        panel.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        addSubview(textField)
        textField.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
    }
}

extension TimePicker: UIPickerViewDataSource, UIPickerViewDelegate {
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return items.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return items[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        selectedItem = row
    }
}

extension TimePicker: UITextFieldDelegate {
    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
        let index = picker.selectedRow(inComponent: 0)
        selectedItem = index
        return true
    }
}

private class PickerTextField: UITextField {
    
    init() {
        super.init(frame: .zero)
        tintColor = .clear
        rightViewMode = .always
        let image = UIImage(named: "hideArrow")
        let imageView = UIImageView(image: image)
        rightView = imageView
        textColor = .titleBlack
        font = .robotoMedium(size: 16)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return editingRect(forBounds: bounds)
    }
    
    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return editingRect(forBounds: bounds)
    }
    
    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        return super.editingRect(forBounds: bounds)
            .inset(by: .init(top: 0,
                             left: 15,
                             bottom: 0,
                             right: 15))
    }
    
    override func rightViewRect(forBounds bounds: CGRect) -> CGRect {
        let width: CGFloat = 9
        let height = width
        return .init(x: bounds.maxX - 15 - width,
                     y: bounds.height/2 - height/2,
                     width: width,
                     height: height)
    }
}

#if canImport(SwiftUI) && DEBUG
import SwiftUI
@available(iOS 13, *)
struct TimePickerPreview: PreviewProvider {
    static var previews: some View {
        UIViewPreview {
            TimePicker(items: ["1", "2"])
        }.frame(maxWidth: 100, maxHeight: 40)
    }
}
#endif
