//
//  TopBookmakersHeaderView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SnapKit

protocol TopBookmakersHeaderViewDelegate: class {
    
    func collapseTapped(_ collapse: Bool)
}

class TopBookmakersHeaderView: UITableViewHeaderFooterView {
    
    weak var delegate: TopBookmakersHeaderViewDelegate?
    
    private var compactConstraint: Constraint?

    private let frontWhiteView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 7
        view.backgroundColor = .white
        view.clipsToBounds = true
        view.layer.cornerRadius = 7
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.lineGray.cgColor
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
    
    lazy var arrowButton: UIButton = {
        let button = UIButton(type: .system)
        let image = UIImage(named:"hideArrow")?.withRenderingMode(.alwaysOriginal)
        button.setImage(image, for: .normal)
        button.addTarget(self, action: #selector(arrowsButtonTapped), for: .touchUpInside)
        return button
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeLayout()
        clipsToBounds = true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc private func arrowsButtonTapped() {
        guard let transform = arrowButton.imageView?.transform else { return }
        let needColapse = transform == .identity
        arrowButton.imageView?.transform = needColapse ? .init(rotationAngle:.pi) : .identity
        columnsHeaderView.isHidden = needColapse
        compactConstraint?.isActive = needColapse
        delegate?.collapseTapped(needColapse)
    }
    
    private func makeLayout() {
        
        addSubview(frontWhiteView)
        frontWhiteView.snp.makeConstraints { (make) in
            make.top.leading.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(4).priority(999)
            compactConstraint = make.height.equalTo(48).constraint
        }
        compactConstraint?.isActive = false

        addSubview(columnsHeaderView)
        columnsHeaderView.snp.makeConstraints { (make) in
            make.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(1)
            make.trailing.equalToSuperview().offset(-1)
            make.height.equalTo(31)
        }

        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.top.equalTo(frontWhiteView).offset(12)
            make.leading.equalTo(frontWhiteView).offset(8)
            make.bottom.equalTo(columnsHeaderView.snp.top).offset(-12)
        }

        addSubview(arrowButton)
        arrowButton.snp.makeConstraints { (make) in
            make.leading.equalTo(titleLabel.snp.trailing)
            make.trailing.equalTo(frontWhiteView).offset(-7)
            make.height.width.equalTo(17)
            make.centerY.equalTo(titleLabel)
        }
    }
}
