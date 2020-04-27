//
//  ForecastsView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ForecastsView: UIView {
    
    let cellId = "forecastCell"
    
    private let headerCompactHeight: CGFloat = 132
    private let headerFullHeight: CGFloat = 283
    
    private var headerIsFull: Bool = false
    
    private(set) lazy var header = ForecastsHeader()
    
    let tableView: UITableView = {
        let table = UITableView(frame: .zero, style: .grouped)
        table.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        table.backgroundColor = .clear
        table.clipsToBounds = false
        table.separatorColor = .clear
        table.rowHeight = 422
        table.isSkeletonable = true
        return table
    }()
    
    init() {
        super.init(frame: .zero)
        configureHeader()
        configureTableView()
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func configureTableView() {
        tableView.register(ForecastCell.self, forCellReuseIdentifier: cellId)
    }
    
    private func configureHeader() {
        header.setCompact(true)
        header.frame = .init(x: 0, y: 0, width: 0, height: headerCompactHeight)
        tableView.tableHeaderView = header
        
        header.filtersButton.addTarget(self, action: #selector(setHeaderHeight), for: .touchUpInside)
    }
    
    @objc func setHeaderHeight() {
        headerIsFull.toggle()
        header.setCompact(!headerIsFull)
        tableView.tableHeaderView?.frame = .init(x: 0, y: 0,
                                                 width: tableView.frame.width,
                                                 height: headerIsFull ? headerFullHeight : headerCompactHeight)
        self.tableView.tableHeaderView = self.tableView.tableHeaderView
    }
    
    private func makeLayout() {
        addSubview(tableView)
        tableView.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(15)
            make.trailing.equalToSuperview().offset(-15)
        }
    }
}

#if canImport(SwiftUI) && DEBUG
import SwiftUI
@available(iOS 13.0.0, *)
struct ForecastsViewPreview: PreviewProvider {
    
    private static var dataSource: TableViewPreviewDataSource!
    
    static var previews: some View {
        UIViewPreview {
            let view = ForecastsView()
            dataSource = TableViewPreviewDataSource(tableView: view.tableView,
                                                    cellTypes: [ForecastCell.self],
                                                    cells: [10])
            view.tableView.dataSource = dataSource
            return view
        }
    }
}
#endif

