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
                forecastsView.tableView.defaultHideSkeleton()
                forecastsView.tableView.reloadData()
            }
        }
    }
    
    init(viewModel: ForecastsViewModel) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
        
        viewModel.loadingStatusChanged = { [weak self] (isLoading) in
            guard let this = self else { return }
            let shouldShowSkeleton = isLoading && this.viewModel.loadedPages == 0
            if shouldShowSkeleton != this.skeletonViewIsActive {
                self?.skeletonViewIsActive = shouldShowSkeleton
            }
        }
        
        viewModel.dataChanged = { [weak self] in
            guard let this = self else { return }
            if !this.skeletonViewIsActive {
                self?.handleUpdates()
            }
        }
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
        
        forecastsView.header.selectionControl.addTarget(self,
                                                        action: #selector(sportChanged),
                                                        for: .valueChanged)
        
        forecastsView.header.timePicker.addTarget(self,
                                                  action: #selector(timeChanged),
                                                  for: .valueChanged)
        
        viewModel.currentPage(1)
    }
    
    @objc private func segmentChanged() {
        let filter = forecastsView.header.forecastsSegmenter.selectedFilter
        
        let curr = viewModel.state ?? .default
        let state = ForecastsViewModelState(sport: curr.sport,
                                            timeFrame: curr.timeFrame,
                                            filter: filter)
        viewModel.state = state
    }
    
    @objc private func sportChanged() {
        guard let sport = forecastsView.header.selectionControl.selectedSport else { return }
        
        let curr = viewModel.state ?? .default
        let state = ForecastsViewModelState(sport: sport,
                                            timeFrame: curr.timeFrame,
                                            filter: curr.filter)
        viewModel.state = state
    }
    
    @objc private func timeChanged() {
        guard let timeFrame = forecastsView.header.timePicker.pickedTimeFrame else { return }
        
        let curr = viewModel.state ?? .default
        let state = ForecastsViewModelState(sport: curr.sport,
                                            timeFrame: timeFrame,
                                            filter: curr.filter)
        viewModel.state = state
    }
    
    private func handleUpdates() {
        let tableView = forecastsView.tableView
        if viewModel.numberOfItems() == 0 { //Other tab opened
            tableView.reloadData()
        } else { //rows added to an end
            let currentCount = tableView.numberOfRows(inSection: 0)
            let newCount = viewModel.numberOfItems()
            let rows = (currentCount..<newCount).map { IndexPath(row: $0, section: 0) }
            tableView.insert(indexPaths: rows)
        }
    }
}

extension ForecastsViewController: SkeletonTableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.numberOfItems()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: forecastsView.cellId) as! ForecastCell
        let forecast = viewModel.item(for: indexPath.row)
        cell.configure(with: forecast)
        cell.delegate = self
        cell.hideSkeletonIfActive()
        
        return cell
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return forecastsView.cellId
    }
}

extension ForecastsViewController: UITableViewDelegate {

    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        viewModel.willDisplay(row: indexPath.row)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let forecast = viewModel.item(for: indexPath.row)
        router.showFullForecastScreen(forecast)
    }
}

extension ForecastsViewController: ForecastCellDelegate {
    
    func userViewTapped(forecast: Forecast) {
        router.showUserScreen(forecast.user)
    }
}
