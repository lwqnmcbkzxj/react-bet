//
//  ForecastsViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastsViewController: UIViewController {
    
    private lazy var forecastsView = ForecastsView()
    
    override func viewDidLoad() {
        view.backgroundColor = .white
        setView(forecastsView)
        forecastsView.tableView.dataSource = self
    }
}

extension ForecastsViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: forecastsView.cellId)!
        return cell
    }
}
