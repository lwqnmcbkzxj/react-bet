//
//  MatchBetsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MatchBetsViewModel: TableSectionProvider {
    
    @LazyInjected
    private var matchService: IMatchService
    
    private let cellId = "userBetCell"
    
    private weak var tableView: UITableView!
    
    private(set) var match: Match?
    
    private let headerView: UIView = {
        let view = ColumnsSectionHeader()
        view.columnsView.setMode(.lastBets)
        return view
    }()
    
    required init(tableView: UITableView) {
        self.tableView = tableView
        
        tableView.register(UserBetCell.self, forCellReuseIdentifier: cellId)
    }
    
    func loadData(for matchId: Int, callback: (()->Void)?) {
        matchService.match(id: matchId) { (result) in
            switch result {
            case .success(let match):
                self.match = match
                callback?()
            case .failure(let err):
                print(err.localizedDescription)
                break
            }
        }
    }
    
    func headerHeight() -> CGFloat {
        return 31
    }
    
    func header() -> UIView? {
        return headerView
    }
    
    func numberOfCells() -> Int {
        return match?.forecasts?.count ?? 0
    }
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! UserBetCell
        if let item = match?.forecasts?[row] {
            cell.configure(with: item)
        }
        return cell
    }
}
