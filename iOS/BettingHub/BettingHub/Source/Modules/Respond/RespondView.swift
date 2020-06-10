//
//  RespondView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 10.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class RespondView: UIView {
    
    let sendButton: UIButton = {
        let image = UIImage(named: "sendIcon")!.withRenderingMode(.alwaysOriginal)
        let view = UIButton(type: .system)
        view.setImage(image, for: .normal)
        return view
    }()
    
    private let stack: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 24
        return view
    }()
    
    private let userLine: UIView = {
        let view = UIView()
        view.backgroundColor = .clear
        return view
    }()
    
    let userImageView: UIImageView = {
        let view = UIImageView()
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.layer.cornerRadius = 7
        return view
    }()
    
    let userLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 17)
        return view
    }()
    
    let userCommentLabel: UILabel = {
        let view = UILabel()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 14)
        return view
    }()
    
    let commentInput: UITextView = {
        let view = UITextView()
        view.textColor = .textGray
        view.font = .robotoRegular(size: 16)
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with comment: Comment?) {
        userLine.isHidden = comment == nil
        userImageView.setImage(url: comment?.userAvatar.data)
        userLabel.text = comment?.username.data
        userCommentLabel.text = comment?.text.data
    }
    
    private func makeLayout() {
        
        addSubview(stack)
        
        buildUserLine()
        
        stack.addArrangedSubview(userLine)
        
        stack.addArrangedSubview(commentInput)
        
        stack.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(20)
            make.leading.equalToSuperview().offset(15)
            make.trailing.equalToSuperview().offset(-15)
            make.bottom.equalToSuperview().offset(-20)
        }
    }
    
    private func buildUserLine() {
        userLine.addSubview(userImageView)
        userImageView.snp.makeConstraints { (make) in
            make.width.height.equalTo(36)
            make.top.leading.bottom.equalToSuperview()
        }
        
        userLine.addSubview(userLabel)
        userLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(userImageView.snp.trailing).offset(10)
            make.top.trailing.equalToSuperview()
        }
        
        userLine.addSubview(userCommentLabel)
        userCommentLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(userLabel)
            make.bottom.equalToSuperview()
        }
    }
}
