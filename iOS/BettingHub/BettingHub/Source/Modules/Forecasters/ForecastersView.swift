//
//  ForecastersView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastersView: UIView {
    
    let cellId = "forecasterCell"
    
    private let headerCompactHeight: CGFloat = 132
    private let headerFullHeight: CGFloat = 215
    
    private var headerIsFull: Bool = false
    
    private(set) lazy var header = ForecastersHeader()
    
    private(set) lazy var sectionHeader = ColumnsSectionHeader()
    
    let tableView: UITableView = {
        let table = UITableView(frame: .zero, style: .grouped)
        table.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        table.backgroundColor = .clear
        table.clipsToBounds = false
        table.separatorColor = .clear
        table.rowHeight = 56
        table.isSkeletonable = true
        return table
    }()
    
    init() {
        super.init(frame: .zero)
        configureHeader()
        configureTableView()
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func configureTableView() {
        tableView.register(ForecasterCell.self, forCellReuseIdentifier: cellId)
    }
    
    private func configureHeader() {
        header.setCompact(true)
        header.frame = .init(x: 0, y: 0, width: 0, height: headerCompactHeight)
        tableView.tableHeaderView = header
        
        header.filtersButton.addTarget(self, action: #selector(setHeaderHeight), for: .touchUpInside)
    }
    
    @objc func setHeaderHeight() {
        headerIsFull.toggle()
        header.setCompact(!headerIsFull)
        tableView.tableHeaderView?.frame = .init(x: 0, y: 0,
                                                 width: tableView.frame.width,
                                                 height: headerIsFull ? headerFullHeight : headerCompactHeight)
        self.tableView.tableHeaderView = self.tableView.tableHeaderView
    }
    
    private func makeLayout() {
        addSubview(tableView)
        tableView.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(15)
            make.trailing.equalToSuperview().offset(-15)
        }
    }
    
}


