//
//  SimilarArticlesViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SimilarArticlesViewModel: TableSectionProvider {
    
    @LazyInjected
    private var articleService: IArticleService
    
    private let cellId = "similarArticle"
    
    private weak var tableView: UITableView!
    
    private let articlesHeader: UIView = {
        let view = SmallTextSectionHeader()
        view.configure(text: Text.similarArticles + ":")
        return view
    }()
    
    private var items: [Article] = [] {
        didSet {
            let section = tableView.numberOfSections - 1
            tableView.reloadSections([section], with: .fade)
        }
    }
    
    required init(tableView: UITableView) {
        self.tableView = tableView
        
        tableView.register(ArticleCell.self, forCellReuseIdentifier: cellId)
        
        articleService.articles(page: 1, limit: 3).onComplete { (articles) in
            self.items = articles
        }
    }
    
    func numberOfCells() -> Int {
        return items.count
    }
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! ArticleCell
        cell.configure(with: items[row])
        return cell
    }
    
    func header() -> UIView? {
        return articlesHeader
    }
    
    func headerHeight() -> CGFloat {
        65
    }
}
