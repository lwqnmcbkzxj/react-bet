//
//  PanelCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class PanelCell: UITableViewCell {
    
    private let topWhiteView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        return view
    }()
    
    private let bottomWhiteView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        return view
    }()
    
    private let topGrayView: UIView = {
       let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    private let bottomGrayView: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        
        bottomWhiteView.layer.cornerRadius = 0
        bottomGrayView.layer.cornerRadius = 0
    }
    
    func isLast(_ last: Bool) {
        if last {
            bottomWhiteView.layer.cornerRadius = 7
            bottomGrayView.layer.cornerRadius = 7
        }
    }
    
    private func makeLayout() {
        contentView.addSubview(topGrayView)
        topGrayView.snp.makeConstraints { (make) in
            make.leading.trailing.top.equalToSuperview()
            make.bottom.equalTo(snp.centerY)
        }
        
        contentView.addSubview(bottomGrayView)
        bottomGrayView.snp.makeConstraints { (make) in
            make.bottom.leading.trailing.equalToSuperview()
            make.top.equalTo(topGrayView.snp.centerY)
        }
        
        contentView.addSubview(topWhiteView)
        topWhiteView.snp.makeConstraints { (make) in
            make.top.equalToSuperview()
            make.leading.equalToSuperview().offset(1)
            make.trailing.equalToSuperview().offset(-1)
            make.bottom.equalTo(snp.centerY)
        }
        
        contentView.addSubview(bottomWhiteView)
        bottomWhiteView.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(topWhiteView)
            make.top.equalTo(topWhiteView.snp.centerY)
            make.bottom.equalToSuperview().offset(-1)
        }
    }
}
