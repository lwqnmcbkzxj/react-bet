//
//  MainView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainView: UIView {
    
    private let testLabel: UILabel = {
        let label = UILabel()
        label.text = "test"
        return label
    }()
    
    init() {
        super.init(frame: .zero)
        backgroundColor = .white
        
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
