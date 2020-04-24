//
//  ForecastsViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SkeletonView

class ForecastsViewController: UIViewController {
    
    private lazy var forecastsView = ForecastsView()
    
    private let viewModel = ForecastsViewModel()
    
    private var skeletonViewIsActive: Bool = false {
        didSet {
            if skeletonViewIsActive {
                forecastsView.tableView.showAnimatedSkeleton()
            } else {
                forecastsView.tableView.hideSkeleton(reloadDataAfter: false)
                forecastsView.tableView.reloadData()
            }
        }
    }

    override func viewDidLoad() {
        view.backgroundColor = .white
        setView(forecastsView)
        forecastsView.tableView.dataSource = self
        
        forecastsView.header.forecastsSegmenter.addTarget(self,
                                                          action: #selector(segmentChanged),
                                                          for: .valueChanged)
        
        viewModel.loadingStatusChanged = { [weak self] (isLoading) in
            self?.skeletonViewIsActive = isLoading
        }
        
        viewModel.dataChanged = { [weak self] in
            if !(self?.skeletonViewIsActive ?? true) {
                self?.forecastsView.tableView.reloadData()
            }
        }
        
        viewModel.fetch()
    }
    
    @objc private func segmentChanged() {
        viewModel.fetch()
    }
}

extension ForecastsViewController: SkeletonTableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.numberOfRows()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: forecastsView.cellId) as! ForecastCell
        let forecast = viewModel.forecast(at: indexPath)
        cell.configure(with: forecast)
        return cell
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return forecastsView.cellId
    }
}
