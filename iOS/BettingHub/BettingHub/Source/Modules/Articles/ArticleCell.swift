//
//  ArticleCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ArticleCell: UITableViewCell {
    
    private let panelView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.cornerRadius = 7
        view.isSkeletonable = true
        return view
    }()
    
    private let articleImage: UIImageView = {
        let view = UIImageView()
        view.layer.cornerRadius = 5
        view.contentMode = .scaleAspectFill
        view.backgroundColor = .lightGray
        view.isSkeletonable = true
        return view
    }()
    
    private let categoryName: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 13)
        view.isSkeletonable = true
        return view
    }()
    
    private let dateLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 13)
        view.isSkeletonable = true
        return view
    }()
    
    private let articleTitle: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 19)
        view.numberOfLines = 2
        view.isSkeletonable = true
        return view
    }()
    
    private let articleTextLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGrayDark
        view.font = .robotoRegular(size: 15)
        view.numberOfLines = 0
        view.isSkeletonable = true
        return view
    }()
    
    private let separatorLine: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        return view
    }()
    
    private let commentsView: LabeledIconWithNumber = {
        let view = LabeledIconWithNumber()
        view.setImage(UIImage(named: "commentIcon")!)
        view.setNumber(3)
        view.isSkeletonable = true
        return view
    }()
    
    private let ratingView: ArrowsStepperView = {
        let view = ArrowsStepperView()
        view.setNumber(23)
        view.isSkeletonable = true
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
    
    func configure(with article: Article) {
        let vm = ArticleViewModelItem(article: article)
        
        articleImage.setImage(url: article.image, placeholder: nil)
        categoryName.text = article.category
        dateLabel.text = vm.dateText
        articleTitle.text = article.name
        articleTextLabel.text = article.text
        commentsView.setNumber(article.commentsCount)
        ratingView.setNumber(article.rating)
    }
    
    private func makeLayout() {
        addSubview(panelView)
        panelView.snp.makeConstraints { (make) in
            make.leading.top.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-20)
        }
        
        panelView.addSubview(articleImage)
        articleImage.snp.makeConstraints { (make) in
            make.leading.top.equalToSuperview().offset(8)
            make.trailing.equalToSuperview().offset(-8)
            make.height.equalTo(articleImage.snp.width).dividedBy(1.91)
        }
        
        panelView.addSubview(categoryName)
        categoryName.snp.makeConstraints { (make) in
            make.leading.equalTo(articleImage)
            make.top.equalTo(articleImage.snp.bottom).offset(10)
        }
        
        panelView.addSubview(dateLabel)
        dateLabel.snp.makeConstraints { (make) in
            make.trailing.equalTo(articleImage.snp.trailing)
            make.top.equalTo(categoryName)
        }
        
        panelView.addSubview(articleTitle)
        articleTitle.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(articleImage)
            make.top.equalTo(categoryName.snp.bottom).offset(15)
        }
        
        panelView.addSubview(articleTextLabel)
        articleTextLabel.snp.contentHuggingVerticalPriority = 999
        articleTextLabel.snp.contentCompressionResistanceVerticalPriority = 999
        articleTextLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(articleImage)
            make.top.equalTo(articleTitle.snp.bottom).offset(12)
            make.height.lessThanOrEqualTo(168)
            
        }
        
        //TODO: tempUI
        articleTextLabel.snp.makeConstraints { (make) in
            make.bottom.equalToSuperview().offset(-12)
        }
//        panelView.addSubview(separatorLine)
//        separatorLine.snp.makeConstraints { (make) in
//            make.leading.trailing.equalToSuperview()
//            make.bottom.equalToSuperview().offset(-43)
//            make.top.equalTo(articleTextLabel.snp.bottom).offset(16)
//        }
//
//        panelView.addSubview(commentsView)
//        commentsView.snp.makeConstraints { (make) in
//            make.leading.equalToSuperview().offset(9)
//            make.top.equalTo(separatorLine.snp.bottom).offset(12)
//            make.height.equalTo(18)
//        }
//
//        panelView.addSubview(ratingView)
//        ratingView.snp.makeConstraints { (make) in
//            make.trailing.equalToSuperview().offset(-9)
//            make.top.equalTo(commentsView)
//            make.height.equalTo(18)
//        }
    }
}
