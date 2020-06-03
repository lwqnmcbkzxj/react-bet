//
//  FullArticleView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullArticleView: UITableViewHeaderFooterView {
    
    private let articleTitleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.numberOfLines = 0
        return view
    }()
    
    private let articleImage: UIImageView = {
        let view = UIImageView()
        view.clipsToBounds = true
        view.layer.cornerRadius = 7
        view.contentMode = .scaleAspectFill
        view.backgroundColor = .lightGray
        return view
    }()
    
    private let articleTextLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 17)
        view.numberOfLines = 0
        return view
    }()
    
    private let commentsView: LabeledIconWithNumber = {
        let view = LabeledIconWithNumber()
        view.setImage(UIImage(named: "commentIcon")!)
        view.setNumber(3)
        return view
    }()
    
    private let ratingView: ArrowsStepperView = {
        let view = ArrowsStepperView()
        view.setNumber(23, state: .none)
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        backgroundColor = .white
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with article: Article) {
        articleTitleLabel.text = article.name
        articleImage.setImage(url: article.image, placeholder: nil)
        articleTextLabel.text = article.text
        commentsView.setNumber(article.commentsCount)
        ratingView.setNumber(article.rating, state: .none)
    }
    
    private func makeLayout() {
        addSubview(articleTitleLabel)
        articleTitleLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(4)
            make.trailing.equalToSuperview().offset(4)
            make.top.equalToSuperview().offset(16)
        }
        
        addSubview(articleImage)
        articleImage.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(articleTitleLabel.snp.bottom).offset(20)
            make.height.equalTo(articleImage.snp.width).dividedBy(1.91)
        }
        
        addSubview(articleTextLabel)
        articleTextLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(articleImage.snp.bottom).offset(28)
        }
        
        addSubview(commentsView)
        commentsView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.top.equalTo(articleTextLabel.snp.bottom).offset(16)
            make.height.equalTo(18)
        }
        
        addSubview(ratingView)
        ratingView.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview()
            make.top.equalTo(commentsView)
            make.height.equalTo(18)
            make.bottom.equalToSuperview()
        }
    }
}
