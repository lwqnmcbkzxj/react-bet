//
//  CommentsSectionHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit


class CommentsSectionHeader: SmallTextSectionHeader {
    
    func configure(commentsCount: Int) {
        configure(text: "\(commentsCount) \(Text.comments)")
    }
}

class SmallTextSectionHeader: UITableViewHeaderFooterView {
    
    private let label: UILabel = {
        let view = UILabel()
        view.font = .robotoMedium(size: 18)
        view.textColor = .titleBlack
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(text: String) {
        label.text = text
    }
    
    private func makeLayout() {
        let background = UIView()
        background.backgroundColor = .white
        addSubview(background)
        background.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.leading.equalToSuperview()
            make.trailing.equalToSuperview().offset(-8)
            make.centerY.equalToSuperview().offset(4)
        }
    }
}
