//
//  MainViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainViewController: UIViewController {
    
    private lazy var mainView = MainView()
    
    private let dataProvider = MainScreenDataProvider()
    
    private lazy var cellsProvider = MainCellsProvider(tableView: mainView.tableView,
                                                       dataProvider: dataProvider)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .white
        setView(mainView)
        mainView.tableView.dataSource = self
        
        let data = (0...14).map { (number) -> Forecaster in
            return Forecaster(username: "user \(number)",
                profilePicture: "",
                income: 50.32)
        }
        
        mainView.tableHeader.setData(forecasters: data)
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
    }
    
    private func numberOfRows(section: Int) -> Int {
        let numbers: [Int: Int] = [
            0: 3,
            1: 5,
            2: 5
        ]
        
        return numbers[section] ?? 0
    }
}

extension MainViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        3
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        numberOfRows(section: section)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        cellsProvider.cell(indexPath: indexPath)
    }
}
