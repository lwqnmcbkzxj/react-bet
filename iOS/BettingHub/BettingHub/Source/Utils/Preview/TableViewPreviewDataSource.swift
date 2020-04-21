//
//  TableViewPreviewDataSource.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TableViewPreviewDataSource: NSObject {
    
    let cells: [Int]
    
    private var numberOfSections: Int {
        return cells.count
    }
    
    private func numberOfRows(in section: Int) -> Int {
        return cells[section]
    }
    
    init(tableView: UITableView,
         cellTypes: [UITableViewCell.Type],
         cells: [Int]) {
        
        self.cells = cells
        
        guard !cellTypes.isEmpty else { fatalError("Add at least one UITableViewCell type")}
        let lastType = cellTypes[cellTypes.count - 1]
        for sectionIndex in 0..<cells.count {
            if cellTypes.count - 1 >= sectionIndex {
                let cellType = cellTypes[sectionIndex]
                tableView.register(cellType.self, forCellReuseIdentifier: "\(sectionIndex)")
            } else {
                tableView.register(lastType.self, forCellReuseIdentifier: "\(sectionIndex)")
            }
        }
    }
}

extension TableViewPreviewDataSource: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return numberOfSections
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return numberOfRows(in: section)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return tableView.dequeueReusableCell(withIdentifier: "\(indexPath.section)")!
    }
}
