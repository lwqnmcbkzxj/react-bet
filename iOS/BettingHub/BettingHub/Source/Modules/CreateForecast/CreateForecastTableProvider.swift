//
//  CreateForecastTableProvider.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CreateForecastTableProvider: TableSectionProvider {
    
    @ModuleDependency(assembly: CreateForecastAssembly.shared)
    private var presenter: ICreateForecastPresenter
    
    private let tableView: UITableView
    
    private let cellId = "betsTableCell"

    private lazy var createHeader: CreateForecastHeaderView = {
        setupBinds()
        return CreateForecastHeaderView()
    }()
    
    private lazy var createFooter: CreateForecastFooterView = {
        return CreateForecastFooterView()
    }()
    
    var collapsedRows: [Int] = []
    
    required init(tableView: UITableView) {
        self.tableView = tableView
        
        tableView.register(BetsTableCell.self, forCellReuseIdentifier: cellId)
    }
    
    func numberOfCells() -> Int {
        presenter.betsData.data.count
    }
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! BetsTableCell
        
        let collapsed = collapsedRows.contains(row)
        let data = presenter.betsData.data[row]
        cell.configure(title: "Title", collapsed: collapsed, tableData: data)
        
        cell.delegate = self
        cell.tag = row
        
        return cell
    }
    
    func header() -> UIView? {
        return createHeader
    }
    
    func footer() -> UIView? {
        return createFooter
    }
    
    private func setupBinds() {
        presenter.betsData.bind { (data) in
            self.tableView.reloadData()
        }
    }
}

extension CreateForecastTableProvider: BetsTableCellDelegate {
    
    func collapse(cell: UITableViewCell) {
        let row = cell.tag
        
        let collapsed = collapsedRows.contains(row)
        
        if collapsed {
            collapsedRows.removeAll(where: {$0 == row})
        } else {
            collapsedRows.append(row)
        }
        
        tableView.reloadRows(at: [IndexPath(row: row, section: 0)], with: .fade)
    }
}
