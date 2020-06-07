//
//  MatchBetsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MatchBetsViewModel: TableSectionProvider {
    
    private let headerView: UIView = {
        let view = ColumnsSectionHeader()
        view.columnsView.setMode(.lastBets)
        return view
    }()
    
    private weak var tableView: UITableView!
    private let sectionNumber: Int
    private let cellId = "userBetCell"
    
    
    private let interactor: IMatchInteractor
    var bind: ObservableBind?
    
    private var match: Match {
        return interactor.match.data
    }
    
    init(tableView: UITableView, interactor: IMatchInteractor, sectionNumber: Int) {
        self.interactor = interactor
        
        self.sectionNumber = sectionNumber
        self.tableView = tableView
        tableView.register(UserBetCell.self, forCellReuseIdentifier: cellId)
        
        
        self.bind = interactor.match.bind { (match) in
            self.tableView.reloadSections([sectionNumber], with: .fade)
        }
    }
    
    func reload() {
        interactor.reloadMatchData()
    }
    
    func headerHeight() -> CGFloat {
        let needHeader = !(match.forecasts?.isEmpty ?? true)
        return needHeader ? 31 : 0
    }
    
    func header() -> UIView? {
        return headerView
    }
    
    func numberOfCells() -> Int {
        return match.forecasts?.count ?? 0
    }
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! UserBetCell
        if let item = match.forecasts?[row] {
            cell.configure(with: item)
        }
        return cell
    }
}
