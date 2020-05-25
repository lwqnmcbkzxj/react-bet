//
//  ProfileForecastsDataSource.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SkeletonView

class ProfileForecastsDataSource: NSObject, ProfileDataSource {
    
    private let cellId = "forecastCellId"
    
    private weak var tableView: UITableView?
    private weak var viewModel: TableViewModel<Forecast, Any>!
    private weak var router: IProfileRouter!
    
    private var showingSkeleton: Bool = false {
        didSet {
            if showingSkeleton {
                tableView?.showAnimatedSkeleton()
            } else {
                tableView?.defaultHideSkeleton()
                tableView?.reloadData()
            }
        }
    }
    
    init(tableView: UITableView, viewModel: TableViewModel<Forecast, Any>, router: IProfileRouter) {
        
        tableView.isSkeletonable = true
        self.tableView = tableView
        tableView.register(ForecastCell.self, forCellReuseIdentifier: cellId)
        
        self.viewModel = viewModel
        self.router = router
        
        super.init()
        
        setupBinds()
    }
    
    func start() {
        viewModel.currentPage(1)
    }
    
    private func setupBinds() {
        viewModel.dataChanged = { [weak self] in
            guard let this = self else { return }
            if !this.showingSkeleton {
                this.handleUpdates()
            }
        }
        
        viewModel.loadingStatusChanged = { [weak self] (isLoading) in
            guard let this = self else { return }
            let showSkeleton = isLoading && this.viewModel.loadedPages == 0
            if showSkeleton != this.showingSkeleton {
                this.showingSkeleton = showSkeleton
            }
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

extension ProfileForecastsDataSource: SkeletonTableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.numberOfItems()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! ForecastCell
        if !showingSkeleton { cell.hideSkeletonIfActive() }
        let item = viewModel.item(for: indexPath.row)
        cell.configure(with: item)
        return cell
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return cellId
    }
}

extension ProfileForecastsDataSource: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return 422
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let forecast = viewModel.item(for: indexPath.row)
        router.showForecast(forecast)
    }
}
