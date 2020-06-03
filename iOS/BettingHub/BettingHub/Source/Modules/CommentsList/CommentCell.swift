//
//  CommentCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CommentCell: UITableViewCell {
    
    private let linesStack: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.spacing = 14
        return view
    }()
    
    private let userImageView: UIImageView = {
        let view = UIImageView()
        view.layer.cornerRadius = 5
        view.layer.masksToBounds = true
        view.makeBordered()
        return view
    }()
    
    private let usernameLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 15)
        view.textAlignment = .left
        return view
    }()
    
    private let dateLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 12)
        return view
    }()
    
    private let commentLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 15)
        view.numberOfLines = 0
        return view
    }()
    
    private let replyButton: UIButton = {
        let view = UIButton(type: .system)
        view.setTitle(Text.reply, for: .normal)
        return view
    }()
    
    private let ratingStepper: ArrowsStepperView = {
        let view = ArrowsStepperView()
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        backgroundColor = .white
        selectionStyle = .none
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        linesStack.arrangedSubviews.forEach { (view) in
            view.removeFromSuperview()
        }
    }
    
    func configure(with model: CommentCellViewModelItem) {
        addLines(long: model.longLines, short: model.shortLines)
        
        userImageView.setImage(url: model.imageUrl)
        usernameLabel.text = model.username
        dateLabel.text = model.date
        commentLabel.text = model.comment
        ratingStepper.setNumber(model.rating, state: .none)
    }
    
    private func addLines(long: Int, short: Int) {
        
        (0..<long).map { (_) -> UIView in
            let view = UIView()
            view.backgroundColor = .lineGray
            view.snp.makeConstraints { $0.width.equalTo(1) }
            return view
        }.forEach { linesStack.addArrangedSubview($0) }
        
        (0..<short).map { (_) -> UIView in
            let view = UIView()
            view.backgroundColor = .clear
            let line = UIView()
            line.backgroundColor = .lineGray
            view.addSubview(line)
            line.snp.makeConstraints { (make) in
                make.top.leading.trailing.equalToSuperview()
                make.bottom.equalToSuperview().offset(-19)
                make.width.equalTo(1)
            }
            return view
        }.forEach { linesStack.addArrangedSubview($0) }
        
        //add extra spacing
        if long + short > 0 {
            linesStack.addArrangedSubview(UIView())
        }
    }
    
    private func makeLayout() {
        contentView.addSubview(linesStack)
        linesStack.snp.makeConstraints { (make) in
            make.top.equalToSuperview()
            make.bottom.equalToSuperview()
            make.leading.equalToSuperview()
            make.width.equalTo(0).priority(.medium)
        }
        
        contentView.addSubview(userImageView)
        userImageView.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(4)
            make.leading.equalTo(linesStack.snp.trailing)
            make.width.height.equalTo(22)
        }
        
        contentView.addSubview(usernameLabel)
        usernameLabel.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(userImageView)
            make.leading.equalTo(userImageView.snp.trailing).offset(9)
        }
        
        contentView.addSubview(dateLabel)
        dateLabel.snp.makeConstraints { (make) in
            make.bottom.equalTo(usernameLabel).offset(-1)
            make.leading.equalTo(usernameLabel.snp.trailing).offset(18)
        }
        
        contentView.addSubview(commentLabel)
        commentLabel.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview()
            make.leading.equalTo(linesStack.snp.trailing)
            make.top.equalToSuperview().offset(35)
        }
        
        contentView.addSubview(replyButton)
        replyButton.snp.makeConstraints { (make) in
            make.leading.equalTo(linesStack.snp.trailing)
            make.top.equalTo(commentLabel.snp.bottom).offset(13)
            make.bottom.equalToSuperview().offset(-19)
            make.height.equalTo(20)
        }
        
        contentView.addSubview(ratingStepper)
        ratingStepper.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview()
            make.bottom.equalTo(replyButton)
            make.height.equalTo(20)
        }
    }
}
