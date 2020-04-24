//
//  MainView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainView: UIView {
    
    let tableView: UITableView = {
        let table = UITableView(frame: .zero, style: .grouped)
        table.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        table.backgroundColor = .clear
        table.clipsToBounds = false
        table.separatorColor = .clear
        return table
    }()
    
    let tableHeader: TopForecastersView = {
        let header = TopForecastersView()
        return header
    }()
    
    init() {
        super.init(frame: .zero)
        backgroundColor = .white
        setupTableHeader()
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupTableHeader() {
        tableHeader.frame = .init(x: 0, y: 0, width: 0, height: 299)
        tableView.tableHeaderView = tableHeader
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
