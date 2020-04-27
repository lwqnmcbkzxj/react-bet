//
//  MainViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainViewController: UIViewController {
    
    var router: IMainScreenRouter!
    
    private lazy var mainView = MainView()
    
    var dataProvider: MainScreenDataProvider!
    
    private lazy var cellsProvider = MainScreenCellsProvider(tableView: mainView.tableView,
                                                             dataProvider: dataProvider,
                                                             buttonFooterDelegate: self)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .white
        setView(mainView)
        mainView.tableView.dataSource = self
        mainView.tableView.delegate = self
        
        setupBinds()
        
        dataProvider.getData()
    }
    
    private func setupBinds() {
        dataProvider.forecastersChanged = { [weak self] in
            guard let this = self else { return }
            let data = (0..<this.dataProvider.numberOfForecasters()).map { (index) -> Forecaster in
                return this.dataProvider.dataForForecaster(index: index)
            }
            this.mainView.tableHeader.setData(forecasters: data)
        }
        
        dataProvider.bookmakersChanged = {[weak self] in self?.reloadSection(section: .topBookmakers) }
        dataProvider.matchesChanged = {[weak self] in self?.reloadSection(section: .topMatches) }
        dataProvider.forecastsChanged = {[weak self] in self?.reloadSection(section: .lastForecasts) }
    }
    
    private func section(at index: Int) -> MainSection {
        let options = [
            (dataProvider.numberOfBookmakers(), MainSection.topBookmakers),
            (dataProvider.numberOfMatches(), .topMatches),
            (dataProvider.numberOfForecasts(), .lastForecasts)
        ]
        if options[index].0 != 0 { return options[index].1 }
        else { return options.dropFirst(index).first(where: { $0.0 != 0 })!.1 }
    }
    
    private func reloadSection(section: MainSection) {
        mainView.tableView.reloadData()
    }
    
    private func selected(row: Int, at section: MainSection) {
        switch section {
        case .lastForecasts:
            let forecast = dataProvider.dataForForecast(row: row)
            router.showFullForecastScreen(forecast)
        default:
            break
        }
    }
}

extension MainViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        cellsProvider.numberOfSections()
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let sec = self.section(at: section)
        return cellsProvider.numberOfCells(at: sec)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let sec = section(at: indexPath.section)
        return cellsProvider.cell(row: indexPath.row, section: sec)
    }
}

extension MainViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let sec = self.section(at: section)
        return cellsProvider.header(for: sec)
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        let sec = self.section(at: section)
        let heights: [MainSection: CGFloat] =
        [
            .topBookmakers: 79,
            .topMatches: 79,
            .lastForecasts: 52
        ]
        return heights[sec]!
    }
    
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        let sec = self.section(at: section)
        return cellsProvider.footer(for: sec)
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 96
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let sec = section(at: indexPath.section)
        let heights: [MainSection: CGFloat] =
        [
            .topBookmakers: 64,
            .topMatches: 53,
            .lastForecasts: 422
        ]
        return heights[sec]!
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let sec = section(at: indexPath.section)
        selected(row: indexPath.row, at: sec)
    }
}

extension MainViewController: ButtonFooterDelegate {
    
    func buttonFooterTapped(section: MainSection) {
        switch section {
        case .lastForecasts:
            router.showForecastsListScreen()
        default:
            break
        }
    }
}
