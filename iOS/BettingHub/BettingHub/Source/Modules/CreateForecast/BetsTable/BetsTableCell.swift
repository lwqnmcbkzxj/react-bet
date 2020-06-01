//
//  BetsTableCell.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol BetsTableCellDelegate: class {
    
    func collapse(cell: UITableViewCell)
}

class BetsTableCell: UITableViewCell {
    
    weak var delegate: BetsTableCellDelegate?
    
    private lazy var manager = BetsTableManager(collectionView: collectionView)
    
    private let panelView: UIView = {
        let view = UIView()
        view.clipsToBounds = true
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.borderWidth = 1
        view.layer.cornerRadius = 7
        return view
    }()
    
    private let betsTableHeader: UILabel = {
        let view = UILabel()
        view.font = .robotoRegular(size: 16)
        view.textColor = .titleBlack
        view.text = "Title"
        return view
    }()
    
    private let hideButton: UIButton = {
        let view = UIButton()
        view.setTitleColor(.blue, for: .normal)
        view.setTitle("(\(Text.collapse))", for: .normal)
        return view
    }()
    
    private let collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 1
        layout.minimumLineSpacing = 1
        let view = UICollectionView(frame: .zero, collectionViewLayout: layout)
        view.backgroundColor = .lineGray
        view.isScrollEnabled = false 
        return view
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        makeLayout()
        selectionStyle = .none
        collectionView.delegate = manager
        collectionView.dataSource = manager
        
        hideButton.addTarget(self, action: #selector(collapseButtonTapped), for: .touchUpInside)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(title: String, collapsed: Bool, tableData: BetsTableData) {
        betsTableHeader.text = title
        manager.configure(with: tableData)
        collectionViewCollapsed(collapsed)
    }
    
    @objc private func collapseButtonTapped() {
        delegate?.collapse(cell: self)
    }
    
    private func collectionViewCollapsed(_ collapsed: Bool) {
        collectionView.snp.updateConstraints { (make) in
            let collapseHeight: CGFloat = 0
            let showHeight = manager.collectionViewHeight
            make.height.equalTo(collapsed ? collapseHeight : showHeight)
        }
    }
    
    private func makeLayout() {
        addSubview(betsTableHeader)
        betsTableHeader.snp.makeConstraints { (make) in
            make.top.leading.equalToSuperview()
        }
        
        addSubview(hideButton)
        hideButton.snp.makeConstraints { (make) in
            make.top.bottom.equalTo(betsTableHeader)
            make.trailing.lessThanOrEqualToSuperview()
            make.leading.equalTo(betsTableHeader.snp.trailing).offset(6)
        }
        
        addSubview(panelView)
        panelView.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.top.equalTo(betsTableHeader.snp.bottom).offset(6)
        }
        
        panelView.addSubview(collectionView)
        collectionView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
            make.height.equalTo(0) //updated on data change
        }
    }
}
