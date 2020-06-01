//
//  SelectionInputView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol StringListable {
    var stringInList: String { get }
}

class SelectionInputView<Item: StringListable>: InputView, UIPickerViewDataSource, UIPickerViewDelegate {
    
    private(set) var selectedItem = Observable<Item?>(nil) {
        didSet {
            sendActions(for: .valueChanged)
        }
    }
    
    var items: [Item] = [] {
        didSet {
            selectedItem.data = nil
            picker.reloadAllComponents()
            
            if items.isEmpty { return }
            
            picker.selectRow(0, inComponent: 0, animated: true)
            pickerView(picker, didSelectRow: 0, inComponent: 0)
        }
    }
    
    private(set) lazy var picker: UIPickerView = {
        let picker = UIPickerView()
        picker.dataSource = self
        picker.delegate = self
        return picker
    }()
    
    override init() {
        super.init()
        textField.inputView = picker
        textField.rightView = arrowView()
        textField.rightViewMode = .always
        tintColor = .clear
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        OperationQueue.main.addOperation {
            UIMenuController.shared.setMenuVisible(false, animated: false)
        }
        return super.canPerformAction(action, withSender: sender)
    }
    
    private func showLoading(_ isLoading: Bool) {
        textField.rightView = isLoading ? loadingView() : arrowView()
    }
    
    private func loadingView() -> UIView {
        let indicator = UIActivityIndicatorView()
        indicator.color = .mainOrange
        return indicator
    }
    
    private func arrowView() -> UIView {
        let view = UIView()
        let arrowImage = UIImage(named: "hideArrow")!
        let arrowView = UIImageView(image: arrowImage)
        arrowView.contentMode = .scaleAspectFit
        view.addSubview(arrowView)
        arrowView.snp.makeConstraints { (make) in
            make.top.leading.equalToSuperview().offset(4)
            make.bottom.trailing.equalToSuperview().offset(-4)
        }
        
        return view
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return items.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return items[row].stringInList
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        textField.text = items[row].stringInList
        selectedItem.data = items[row]
        textField.sendActions(for: .editingChanged)
    }
}
