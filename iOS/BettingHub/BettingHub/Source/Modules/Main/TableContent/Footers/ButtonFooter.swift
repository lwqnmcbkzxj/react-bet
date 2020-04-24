//
//  ButtonFooter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol ButtonFooterDelegate: class {
    
    func buttonFooterTapped(section: MainSection)
}

class ButtonFooter: UITableViewHeaderFooterView {
    
    var section: MainSection?
    weak var delegate: ButtonFooterDelegate?
    
    private var button: BottomButton = {
        let button = BottomButton()
        button.setTitle(Text.showMore, for: .normal)
        return button
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeConstaints()
        button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(section: MainSection, delegate: ButtonFooterDelegate) {
        self.section = section
        self.delegate = delegate
    }
    
    @objc private func buttonTapped() {
        guard let section = section else { return }
        delegate?.buttonFooterTapped(section: section)
    }
    
    private func makeConstaints() {
        addSubview(button)
        button.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(40)
            make.top.equalToSuperview().offset(18)
        }
    }
}
