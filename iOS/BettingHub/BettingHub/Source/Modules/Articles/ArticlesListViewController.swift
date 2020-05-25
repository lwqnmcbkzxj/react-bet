//
//  ArticlesListViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ArticlesListViewController: UIViewController {
    
    var router: IArticlesListRouter!
    
    private let cellId = "articleCell"
    
    private let tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.backgroundColor = .white
        view.separatorColor = .clear
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.clipsToBounds = false
        return view
    }()
    
    private let headerView: UITableViewHeaderFooterView = {
        let view = BigTitleHeader()
        view.titleLabel.text = Text.articles
        return view
    }()
    
    private let articlesViewModel = ArticlesListViewModel()
    
    private var skeletonViewIsActive: Bool = false {
        didSet {
            if skeletonViewIsActive {
                tableView.showAnimatedSkeleton()
            } else {
                tableView.defaultHideSkeleton()
                tableView.reloadData()
            }
        }
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(tableView, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(ArticleCell.self, forCellReuseIdentifier: cellId)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupBinds()
        articlesViewModel.currentPage(1)
    }
    
    private func setupBinds() {
        articlesViewModel.loadingStatusChanged = { [weak self] (isLoading) in
            guard let this = self else { return }
            let shouldShowSkeleton = isLoading && this.articlesViewModel.loadedPages == 0
            if shouldShowSkeleton != this.skeletonViewIsActive {
                self?.skeletonViewIsActive = shouldShowSkeleton
            }
        }
        
        articlesViewModel.dataChanged = { [weak self] in
            guard let this = self else { return }
            if !this.skeletonViewIsActive {
                this.handleUpdates()
            }
        }
    }
    
    private func handleUpdates() {
        if articlesViewModel.numberOfItems() == 0 { //Other tab opened
            tableView.reloadData()
        } else { //rows added to an end
            let currentCount = tableView.numberOfRows(inSection: 0)
            let newCount = articlesViewModel.numberOfItems()
            let rows = (currentCount..<newCount).map { IndexPath(row: $0, section: 0) }
            tableView.insert(indexPaths: rows)
        }
    }
}

extension ArticlesListViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return articlesViewModel.numberOfItems()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! ArticleCell
        cell.configure(with: articlesViewModel.item(for: indexPath.row))
        return cell
    }
}

extension ArticlesListViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 60
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return headerView
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        let cellPage = (indexPath.row / articlesViewModel.pageSize) + 1
        articlesViewModel.currentPage(cellPage)

        let isEnd = articlesViewModel.numberOfItems() == indexPath.row + 1
        if isEnd {
            articlesViewModel.currentPage(cellPage + 1)
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let item = articlesViewModel.item(for: indexPath.row)
        router.show(article: item)
    }
}
