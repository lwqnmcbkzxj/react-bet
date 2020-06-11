//
//  CommentsSectionHeader.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol CommentsSectionHeaderDelegate: class {
    
    func changedSorting(_ header: CommentsSectionHeader)
}

class CommentsSectionHeader: UITableViewHeaderFooterView {
    
    weak var delegate: CommentsSectionHeaderDelegate?
    
    private let label: UILabel = {
        let view = UILabel()
        view.font = .robotoMedium(size: 18)
        view.textColor = .titleBlack
        return view
    }()
    
    let sortingSelector: CommentsSortingSelector = {
        let view = CommentsSortingSelector()
        return view
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeLayout()
        
        sortingSelector.selectedIndex = 0
        sortingSelector.addTarget(self, action: #selector(sortingChanged), for: .valueChanged)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(commentsCount: Int) {
        self.label.text = "\(commentsCount) \(Text.comments)"
    }
    
    @objc private func sortingChanged() {
        delegate?.changedSorting(self)
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
            make.top.leading.equalToSuperview()
            make.trailing.equalToSuperview().offset(-8)
        }
        
        addSubview(sortingSelector)
        sortingSelector.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(44)
            make.top.equalTo(label).offset(24)
            make.bottom.equalToSuperview().offset(-16)
        }
    }
}
