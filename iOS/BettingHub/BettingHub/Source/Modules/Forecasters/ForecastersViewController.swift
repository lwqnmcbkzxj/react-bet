//
//  ForecastersViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SkeletonView

class ForecastersViewController: UIViewController {
    
    var router: IForecastersRouter!
    
    private lazy var forecastersView = ForecastersView()
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(forecastersView)
        
        forecastersView.header.timeFrameSegmenter.addTarget(self,
                                                            action: #selector(timeChanged),
                                                            for: .valueChanged)
    }
    
    private var showingSkeleton: Bool = false {
        didSet {
            if showingSkeleton {
                forecastersView.tableView.showAnimatedSkeleton()
            } else {
                forecastersView.tableView.defaultHideSkeleton()
                forecastersView.tableView.reloadData()
            }
        }
    }
    
    var viewModel: TableViewModel<Forecaster, ForecastersViewModelState>!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bind()
    }
    
    override func viewDidLayoutSubviews() {
        viewModel.currentPage(1)
    }
    
    private func bind() {
        forecastersView.tableView.dataSource = self
        forecastersView.tableView.delegate = self
        
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
            forecastersView.tableView.reloadData()
        } else {
            let currentRowsCount = forecastersView.tableView.numberOfRows(inSection: 0)
            let newCount = viewModel.numberOfItems()
            let ips = (currentRowsCount..<newCount).map { IndexPath(row: $0, section: 0) }
            forecastersView.tableView.insert(indexPaths: ips)
        }
    }
    
    @objc private func timeChanged() {
        guard
            let timeFrame = forecastersView.header.timeFrameSegmenter.selectedTimeFrame,
            let sport = forecastersView.header.sportSelector.selectedSport
        else { return }
        viewModel.state = ForecastersViewModelState(timeFrame: timeFrame, sport: sport)
    }
}

extension ForecastersViewController: SkeletonTableViewDataSource {
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: forecastersView.cellId) as! ForecasterCell
        let item = viewModel.item(for: indexPath.row)
        cell.configure(with: item)
        
        cell.hideSkeletonIfActive()
        
        return cell
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        viewModel.numberOfItems()
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return forecastersView.cellId
    }
}

extension ForecastersViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 31
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return forecastersView.sectionHeader
    }
    
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        let cellPage = (indexPath.row / viewModel.pageSize) + 1
        viewModel.currentPage(cellPage)

        let isEnd = viewModel.numberOfItems() == indexPath.row + 1
        if isEnd {
            viewModel.currentPage(cellPage + 1)
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let item = viewModel.item(for: indexPath.row)
        router.show(item)
    }
}
