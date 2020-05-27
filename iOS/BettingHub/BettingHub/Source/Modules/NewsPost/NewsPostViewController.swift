//
//  NewsPostViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import AloeStackView

class NewsPostViewController: UIViewController {
    
    private let stack: AloeStackView = {
        let view = AloeStackView()
        view.axis = .vertical
        view.hidesSeparatorsByDefault = true
        return view
    }()
    
    private let titleLabel: UILabel = {
        let view = UILabel()
        view.font = .robotoMedium(size: 20)
        view.textColor = .titleBlack
        view.numberOfLines = 0
        view.textAlignment = .center
        return view
    }()
    
    private let textLabel: UILabel = {
        let view = UILabel()
        view.font = .robotoRegular(size: 17)
        view.textColor = .titleBlack
        view.numberOfLines = 0
        return view
    }()
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        
        addBackView(text: nil)
        setView(stack)
        
        makeLayout()
    }
    
    func configure(with newsPost: NewsPost) {
        titleLabel.text = newsPost.name
        textLabel.text = newsPost.text
    }
    
    private func makeLayout() {
        let view = UIView()
        view.backgroundColor = .clear
        
        view.addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(16)
            make.trailing.equalToSuperview().offset(-16)
            make.top.equalToSuperview()
        }
        
        view.addSubview(textLabel)
        textLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(titleLabel.snp.bottom).offset(20)
            make.bottom.equalToSuperview().offset(-16)
        }
        
        stack.addRow(view)
        stack.setInset(forRow: stack.firstRow!,
                       inset: .init(top: 20, left: 16, bottom: 20, right: 16))
    }
}
