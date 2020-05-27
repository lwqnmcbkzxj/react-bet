//
//  NewsCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class NewsCell: UITableViewCell {
    
    private let panelView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 7
        view.isSkeletonable = true
        return view
    }()
    
    private let categoryLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 13)
        view.isSkeletonable = true
        view.text = "categoryLabel"
        return view
    }()
    
    private let dateLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 13)
        view.textAlignment = .right
        view.isSkeletonable = true
        view.text = "dateLabel"
        return view
    }()
    
    private let newTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 19)
        view.numberOfLines = 2
        view.isSkeletonable = true
        view.text = "New title label"
        return view
    }()
    
    private let textPartLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGrayDark
        view.font = .robotoRegular(size: 15)
        view.numberOfLines = 8
        view.isSkeletonable = true
        view.text = "text\ntext\ntext"
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        backgroundColor = .white
        selectionStyle = .none
        isSkeletonable = true
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with newsPost: NewsPost) {
        let vm = NewsPostViewModelItem(newsPost: newsPost)
        categoryLabel.text = newsPost.category
        dateLabel.text = vm.dateText
        newTitleLabel.text = newsPost.name
        textPartLabel.text = newsPost.text
    }
    
    private func makeLayout() {
        contentView.addSubview(panelView)
        panelView.snp.makeConstraints { (make) in
            make.leading.top.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-20)
        }
        
        panelView.addSubview(categoryLabel)
        categoryLabel.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(16)
            make.leading.equalToSuperview().offset(8)
        }
        
        panelView.addSubview(dateLabel)
        dateLabel.snp.makeConstraints { (make) in
            make.top.equalTo(categoryLabel)
            make.leading.equalTo(categoryLabel.snp.trailing).offset(8)
            make.trailing.equalToSuperview().offset(-8)
            
        }
        
        panelView.addSubview(newTitleLabel)
        newTitleLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(8)
            make.trailing.equalToSuperview().offset(-8)
            make.top.equalTo(categoryLabel.snp.bottom).offset(16)
        }
        
        panelView.addSubview(textPartLabel)
        textPartLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(newTitleLabel)
            make.top.equalTo(newTitleLabel.snp.bottom).offset(16)
            make.bottom.equalToSuperview().offset(-16)
        }
    }
}
