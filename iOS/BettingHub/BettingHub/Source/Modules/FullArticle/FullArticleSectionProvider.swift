//
//  FullArticleSectionProvider.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit


class FullArticleSectionProvider: TableSectionProvider {
    
    let article: Article
    
    private lazy var articleView: UIView = {
        let view = FullArticleView()
        view.configure(with: article)
        return view
    }()
    
    private weak var tableView: UITableView!
    
    init(tableView: UITableView, article: Article) {
        self.tableView = tableView
        self.article = article
    }
    
    func header() -> UIView? {
        articleView
    }
    
    func numberOfCells() -> Int {
        return 0
    }
    
    func cell(for row: Int) -> UITableViewCell {
        fatalError("This section shouldn't have cells")
    }
}
