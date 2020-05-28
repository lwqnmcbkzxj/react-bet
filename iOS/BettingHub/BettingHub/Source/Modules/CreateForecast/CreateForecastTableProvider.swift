//
//  CreateForecastTableProvider.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CreateForecastTableProvider: TableSectionProvider {
    
    private let tableView: UITableView
    
    private let cellId = "betsTableCell"
    
    private let createHeader = CreateForecastHeaderView()
    
    required init(tableView: UITableView) {
        self.tableView = tableView
        
        tableView.register(BetsTableCell.self, forCellReuseIdentifier: cellId)
    }
    
    func numberOfCells() -> Int {
        return 2
    }
    
    private let mockData = BetsTableData(bookmakers: [.stub()], columns: ["Bet1", "Bet2"], values: [[10, 20]])
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! BetsTableCell
        cell.configure(title: "Title", collapsed: false, tableData: mockData)
        return cell
    }
    
    func header() -> UIView? {
        return createHeader
    }
}
