//
//  BigTitleHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BigTitleHeader: UITableViewHeaderFooterView {
    
    let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.text = Text.lastForecasts
        view.textAlignment = .center
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(26)
            make.top.equalToSuperview().priority(.high)
            make.bottom.equalToSuperview().offset(-26)
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
