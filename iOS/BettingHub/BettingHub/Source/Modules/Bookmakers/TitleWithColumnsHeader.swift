//
//  TitleWithColumnsHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TitleWithColumnHeader: UITableViewHeaderFooterView {
    
    private let backView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        return view
    }()
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.textAlignment = .center
        return view
    }()
    
    private let columnsView: ColumnsView = {
        let view = ColumnsView()
        view.layer.cornerRadius = 7
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        
        clipsToBounds = true //to cut off bottom part of columns header
        
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(text: String, mode: ColumnsView.Mode) {
        titleLabel.text = text
        columnsView.setMode(mode)
    }
    
    private func makeLayout() {
        addSubview(backView)
        backView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(3)
            make.leading.trailing.equalToSuperview()
        }
        
        addSubview(columnsView)
        columnsView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(titleLabel.snp.bottom)
            make.height.equalTo(35)
            make.bottom.equalToSuperview().offset(4) //to clip off bottom rounded corners
        }
    }
}
