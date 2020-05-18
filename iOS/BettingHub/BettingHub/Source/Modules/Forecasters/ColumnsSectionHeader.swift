//
//  ColumnsSectionHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ColumnsSectionHeader: UITableViewHeaderFooterView {
    
    let columnsView: ColumnsView = {
        let view = ColumnsView()
        view.setMode(.forecasters)
        view.backgroundColor = .clear
        return view
    }()
    
    private let backView: UIView = {
        let view = UIView()
        view.backgroundColor = .lightGray
        view.layer.cornerRadius = 7
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        clipsToBounds = true
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(backView)
        backView.snp.makeConstraints { (make) in
            make.leading.top.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(7)
        }
        
        addSubview(columnsView)
        columnsView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-2)
        }
    }
}
