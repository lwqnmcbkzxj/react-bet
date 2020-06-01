//
//  CreateForecastViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import AloeStackView

class CreateForecastViewController: UIViewController {
    
    @ModuleDependency(assembly: CreateForecastAssembly.shared)
    var provider: TableSectionProvider
    
    let tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.backgroundColor = .white
        view.separatorColor = .clear
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.clipsToBounds = false
        return view
    }()
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        setView(tableView, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
        tableView.delegate = self
        tableView.dataSource = self
    }
}

extension CreateForecastViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return provider.numberOfCells()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return provider.cell(for: indexPath.row)
    }
}

extension CreateForecastViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return provider.header()
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return provider.headerHeight()
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return provider.cellHeight()
    }
    
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return provider.footer()
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return provider.footerHeight()
    }
}
