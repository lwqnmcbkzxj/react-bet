//
//  ProfileViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ProfileViewController: UIViewController {
    
    var router: IProfileRouter!
    
    private let isSelf: Bool
    
    private let forecaster: Forecaster
    
    var userForecastsViewModel: TableViewModel<Forecast, Any>!
    var userStatsViewModel: TableViewModel<Forecaster, Any>!
    var userFavoritesViewModel: TableViewModel<Forecast, Any>!
    
    private lazy var userForecastsDataSource = ProfileForecastsDataSource(tableView: tableView,
                                                                          viewModel: userForecastsViewModel,
                                                                          router: router)
    private lazy var userStatsDataSource = ProfileStatisticsDataSource(with: tableView,
                                                                       viewModel: userStatsViewModel)
    private lazy var userFavoritesDataSource = ProfileForecastsDataSource(tableView: tableView,
                                                                          viewModel: userFavoritesViewModel,
                                                                          router: router)

    private lazy var tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.backgroundColor = .white
        view.separatorColor = .clear
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.clipsToBounds = false
        return view
    }()
    
    private lazy var profileHeader: ProfileHeaderView = {
        let view = ProfileHeaderView(isSelf: isSelf)
        return view
    }()
    
    init(isSelf: Bool, forecaster: Forecaster) {
        self.isSelf = isSelf
        self.forecaster = forecaster
        
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func loadView() {
        super.loadView()
        if !isSelf { addBackView(text: nil) }
        view.backgroundColor = .white
        setView(tableView, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
        profileHeader.frame = .init(x: 0, y: 0, width: tableView.frame.width, height: 323)
        tableView.tableHeaderView = profileHeader
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        profileHeader.segmenter.addTarget(self, action: #selector(changedTab), for: .valueChanged)
        profileHeader.segmenter.selectedIndex = 1
    }
    
    @objc private func changedTab() {
        guard let index = profileHeader.segmenter.selectedIndex else { return }
        setDelegate(for: index)
    }
    
    private func setDelegate(for index: Int) {
        var delegate: ProfileDataSource!
        
        if index == 0 {
            delegate = userForecastsDataSource
        } else if index == 1 {
            delegate = userStatsDataSource
        } else if index == 2 {
            delegate = userFavoritesDataSource
        }
        
        tableView.dataSource = delegate
        tableView.delegate = delegate
        tableView.reloadData()
        delegate.start()
    }
}
