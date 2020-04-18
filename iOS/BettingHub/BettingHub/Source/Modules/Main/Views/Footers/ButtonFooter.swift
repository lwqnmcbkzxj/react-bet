//
//  ButtonFooter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ButtonFooter: UITableViewHeaderFooterView {
    
    private var button: BottomButton = {
        let button = BottomButton()
        button.setTitle(Text.showMore, for: .normal)
        return button
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeConstaints()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeConstaints() {
        addSubview(button)
        button.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(40)
            make.top.equalToSuperview().offset(18)
            make.bottom.equalToSuperview().offset(-40)
        }
    }
}
