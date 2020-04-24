//
//  InputView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SnapKit

class InputView: UIView {
    
    let label: UILabel = {
        let label = UILabel()
        label.textColor = .textGray
        label.font = UIFont.robotoRegular(size: 12)
        label.text = "label"
        return label
    }()
    
    let textField: BorderedTextField = {
        let textField = BorderedTextField()
        return textField
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.leading.top.trailing.equalToSuperview()
            make.height.equalTo(16).priority(999)
        }
        
        addSubview(textField)
        textField.snp.makeConstraints { (make) in
            make.leading.bottom.trailing.equalToSuperview()
            make.height.equalTo(48).priority(999)
            make.top.equalTo(label.snp.bottom).offset(6)
        }
    }
}
