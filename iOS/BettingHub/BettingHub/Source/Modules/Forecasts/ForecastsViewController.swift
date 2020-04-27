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
    
    var router: IForecastsRouter!
    
    private lazy var forecastsView = ForecastsView()
    
    private let viewModel: ForecastsViewModel
    
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
    
    init(viewModel: ForecastsViewModel) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        view.backgroundColor = .white
        setView(forecastsView)
        forecastsView.tableView.dataSource = self
        forecastsView.tableView.delegate = self
        
        forecastsView.header.forecastsSegmenter.addTarget(self,
                                                          action: #selector(segmentChanged),
                                                          for: .valueChanged)
        
        viewModel.loadingStatusChanged = { [weak self] (isLoading) in
            guard let this = self else { return }
            let shouldShowSkeleton = isLoading && this.viewModel.loadedPages == 0
            if shouldShowSkeleton != this.skeletonViewIsActive {
                self?.skeletonViewIsActive = shouldShowSkeleton
            }
        }
        
        viewModel.dataChanged = { [weak self] in
            if !(self?.skeletonViewIsActive ?? true) {
                self?.handleUpdates()
            }
        }
        
        //start loading
        viewModel.currentPage = 1
    }
    
    @objc private func segmentChanged() {
        viewModel.forecastFilter = forecastsView.header.forecastsSegmenter.selectedFilter
    }
    
    private func handleUpdates() {
        let tableView = forecastsView.tableView
        if viewModel.numberOfRows() == 0 { //Other tab opened
            tableView.reloadData()
        } else { //rows added to an end
            let currentCount = tableView.numberOfRows(inSection: 0)
            let newCount = viewModel.numberOfRows()
            let rows = (currentCount..<newCount).map { IndexPath(row: $0, section: 0) }
            tableView.insert(indexPaths: rows)
        }
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

extension ForecastsViewController: UITableViewDelegate {

    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        let cellPage = (indexPath.row / viewModel.pageSize) + 1
        viewModel.currentPage = cellPage

        let isEnd = viewModel.numberOfRows() == indexPath.row + 1
        if isEnd {
            viewModel.currentPage = cellPage + 1
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let forecast = viewModel.forecast(at: indexPath)
        router.showFullForecastScreen(forecast)
    }
}

extension ForecastsViewController: UITableViewDataSourcePrefetching {
    
    func tableView(_ tableView: UITableView, prefetchRowsAt indexPaths: [IndexPath]) {
        guard let lastCellIndex = indexPaths.last?.row else { return }
        if (Double(lastCellIndex) / Double(viewModel.pageSize)) > Double(viewModel.loadedPages) {
            viewModel.currentPage += 1
        }
    }
}

