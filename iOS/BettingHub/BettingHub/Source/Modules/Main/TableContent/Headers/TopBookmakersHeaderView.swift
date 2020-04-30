//
//  TopBookmakersHeaderView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TopBookmakersHeaderView: UITableViewHeaderFooterView {
    
    private let topBackGrayView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 7
        view.backgroundColor = .lineGray
        return view
        
    }()
    private let bottomBackGrayView: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    private let frontWhiteView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 7
        view.backgroundColor = .white
        return view
    }()
    
    let columnsHeaderView: ColumnsView = {
        let view = ColumnsView()
        return view
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        label.textColor = .titleBlack
        label.text = "Title"
        label.font = .robotoMedium(size: 18)
        return label
    }()
    
    private let arrowButton: UIButton = {
        let button = UIButton(type: .system)
        let image = UIImage(named:"hideArrow")?.withRenderingMode(.alwaysOriginal)
        button.setImage(image, for: .normal)
        return button
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(topBackGrayView)
        topBackGrayView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
            make.height.equalTo(79)
        }
        
        addSubview(bottomBackGrayView)
        bottomBackGrayView.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.height.equalTo(31)
        }
        
        addSubview(frontWhiteView)
        frontWhiteView.snp.makeConstraints { (make) in
            make.top.leading.equalTo(topBackGrayView).offset(1)
            make.bottom.trailing.equalTo(topBackGrayView).offset(-1)
        }
        
        addSubview(columnsHeaderView)
        columnsHeaderView.snp.makeConstraints { (make) in
            make.leading.equalTo(bottomBackGrayView).offset(1)
            make.trailing.equalTo(bottomBackGrayView).offset(-1)
            make.top.bottom.equalTo(bottomBackGrayView)
        }
        
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.top.equalTo(frontWhiteView).offset(12)
            make.leading.equalTo(frontWhiteView).offset(8)
            make.bottom.equalTo(columnsHeaderView.snp.top).offset(-12)
        }
        
//        addSubview(arrowButton)
//        arrowButton.snp.makeConstraints { (make) in
//            make.leading.equalTo(titleLabel.snp.trailing)
//            make.trailing.equalTo(frontWhiteView).offset(-7)
//            make.height.width.equalTo(17)
//            make.centerY.equalTo(titleLabel)
//        }
    }
}
