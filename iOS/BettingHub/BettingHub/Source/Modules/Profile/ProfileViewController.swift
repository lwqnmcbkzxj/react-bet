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
    var interactor: IProfileInteractor!
    
    private var isSelf: Bool {
        return interactor.isSelf()
    }
    
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

    var profileHeader: ProfileHeaderView!
    
    private lazy var tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.backgroundColor = .white
        view.separatorColor = .clear
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.clipsToBounds = false
        return view
    }()
    
    override func loadView() {
        super.loadView()
        if !isSelf { addBackView(text: nil) }
        view.backgroundColor = .white
        setView(tableView, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
        profileHeader.frame = .init(x: 0, y: 0, width: tableView.frame.width, height: 263)
        tableView.tableHeaderView = profileHeader
        profileHeader.settingsButton.addTarget(self, action: #selector(settingsTapped), for: .touchUpInside)
        profileHeader.settingsButton.isHidden = !isSelf
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        profileHeader.segmenter.addTarget(self, action: #selector(changedTab), for: .valueChanged)
        profileHeader.segmenter.selectedIndex = 0
        
        //configure with initial data (may be incomplete)
        configure(forecaster: interactor.profile())
        
        //load complete data
        interactor.loadData { [weak self] in
            guard let this = self else { return }
            self?.configure(forecaster: this.interactor.profile())
        }
        
        profileHeader.didLoad()
    }
    
    @objc private func changedTab() {
        guard let index = profileHeader.segmenter.selectedIndex else { return }
        setDelegate(for: index)
    }
    
    private func setDelegate(for index: Int) {
        let delegate = getDelegate()
        tableView.dataSource = delegate
        tableView.delegate = delegate
        delegate?.reload()
    }
    
    private func getDelegate() -> ProfileDataSource? {
        let index = profileHeader.segmenter.selectedIndex ?? -1
        if index == 0 {
            return userForecastsDataSource
        } else if index == 1 {
            return userStatsDataSource
        } else if index == 2 {
            return userFavoritesDataSource
        }
        
        return nil
    }
    
    private func configure(forecaster: Forecaster) {
        userStatsDataSource.configure(forecaster: forecaster)
    }
    
    @objc private func settingsTapped() {
        guard let userInfo = interactor.selfProfile() else { return }
        
        router.showSettings(userInfo: userInfo)
    }
}

extension ProfileViewController: IMainTabBarDelegate {
    
    func showed(tabBar: IMainTabBar, screen: MainTabBarScreen) {
//        getDelegate()?.reload()
    }
}
