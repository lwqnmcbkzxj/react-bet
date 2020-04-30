//
//  MatchesViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SkeletonView

class MatchesViewController: UIViewController {
    // Views
    private lazy var tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.clipsToBounds = false
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.backgroundColor = .white
        view.rowHeight = 64
        view.separatorColor = .clear
        view.delegate = self
        view.dataSource = self
        view.register(MatchCell.self, forCellReuseIdentifier: cellId)
        view.isSkeletonable = true
        return view
    }()
    
    private lazy var header: TitleWithColumnHeader = {
        let view = TitleWithColumnHeader()
        let dateW = 0.135
        let matchW = 0.47
        let betsW = 1 - dateW - matchW
        view.configure(text: Text.topMatches, mode: .matches)
        return view
    }()
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(tableView, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
    }
    // //////////////////
    
    private var isSkeletonActive: Bool = false {
        didSet {
            if isSkeletonActive {
                tableView.showAnimatedSkeleton()
            } else {
                tableView.defaultHideSkeleton()
                tableView.reloadData()
            }
        }
    }
    
    private let cellId = "matchCell"
    
    var viewModel: MatchesViewModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        bind()
        
        //Start
        viewModel.page = 1
    }
    
    private func bind() {
        viewModel.dataChanged = { [weak self] in
            guard let this = self else { return }
            //if updates added to already presented data. i.e not first load
            if !this.isSkeletonActive {
                this.handleUpdates()
            }
        }
        
        viewModel.loadingStatusChanged = { [weak self] (isLoading) in
            guard let this = self else { return }
            let shouldShowSkeleton = isLoading && this.viewModel.loadedPages == 0 //if first load
            if shouldShowSkeleton != this.isSkeletonActive { //if changes really happened
                this.isSkeletonActive = shouldShowSkeleton
            }
        }
    }
    
    private func handleUpdates() {
        let currentRowsCount = tableView.numberOfRows(inSection: 0)
        let newCount = viewModel.numberOfItems()
        let ips = (currentRowsCount..<newCount).map { IndexPath(row: $0, section: 0) }
        tableView.insert(indexPaths: ips)
    }
}

extension MatchesViewController: SkeletonTableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.numberOfItems()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! MatchCell
        let item = viewModel.item(for: indexPath.row)
        cell.configure(with: item)
        cell.hideSkeletonIfActive()
        return cell
    }
    
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return cellId
    }
}

extension MatchesViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        if tableView.numberOfRows(inSection: section) == 0 { return 0 }
        return 108
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        if tableView.numberOfRows(inSection: section) == 0 { return nil }
        return header
    }
    
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        let cellPage = (indexPath.row / viewModel.pageSize) + 1
        viewModel.page = cellPage

        let isEnd = viewModel.numberOfItems() == indexPath.row + 1
        if isEnd {
            viewModel.page = cellPage + 1
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
    }
}

