//
//  ProfileStatisticsDataSource.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 02.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SkeletonView

class ProfileStatisticsDataSource: NSObject, ProfileDataSource {
    
    private let cellId = "statisticsCell"
    private var forecaster: Forecaster?
    
    private weak var tableView: UITableView?
    private weak var viewModel: TableViewModel<Forecaster, Any>!
    
    init(with tableView: UITableView, viewModel: TableViewModel<Forecaster, Any>) {
        self.tableView = tableView
        self.viewModel = viewModel
        tableView.register(ProfileStatisticsCell.self, forCellReuseIdentifier: cellId)
        
        super.init()
        
        setupBinds()
    }
    
    func start() {
//        viewModel?.currentPage(1)
    }
    
    func configure(forecaster: Forecaster) {
        self.forecaster = forecaster
        tableView?.reloadData()
    }
    
    private func setupBinds() {
        viewModel.dataChanged = { [weak self] in
            guard let this = self else { return }
            this.handleUpdates()
        }
    }
    
    private func handleUpdates() {
        if viewModel.numberOfItems() == 0 {
            tableView?.reloadData()
        } else {
            let currentRowsCount = tableView?.numberOfRows(inSection: 0) ?? 0
            let newCount = viewModel.numberOfItems()
            let ips = (currentRowsCount..<newCount).map { IndexPath(row: $0, section: 0) }
            tableView?.insert(indexPaths: ips)
        }
    }
}

extension ProfileStatisticsDataSource: SkeletonTableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return forecaster == nil ? 0 : 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! ProfileStatisticsCell
//        let item = viewModel.item(for: indexPath.row)
        guard let forecaster = self.forecaster else { return cell }
        cell.configure(with: forecaster)
        return cell
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return cellId
    }
}

extension ProfileStatisticsDataSource: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 335
    }
}
