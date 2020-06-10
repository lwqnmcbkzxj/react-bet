//
//  CommentsTableView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class CommentsTableView: UITableView {
    
    private let cellId = "commentCell"
    private weak var header: UITableViewHeaderFooterView?
    
//    var viewModel: ICommentsTableViewModel
    
    init(header: UITableViewHeaderFooterView) {
//        self.viewModel = viewModel
        self.header = header
        
        super.init(frame: .zero, style: .grouped)
        separatorColor = .clear
        scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        backgroundColor = .white
        clipsToBounds = false 
        
        setupBinds()
        registerCells()
        
        self.delegate = self
        self.dataSource = self
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupBinds() {
//        viewModel.reloadTableView = { [weak self] in
//            self?.reloadData()
//        }
//        
//        viewModel.updateLoadingStatus = { [weak self] in
//            // update UI
//        }
    }
    
    private func registerCells() {
        register(CommentCell.self, forCellReuseIdentifier: cellId)
    }
}

//TODO: tempUI

extension CommentsTableView: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        fatalError()
    }
}

extension CommentsTableView: UITableViewDelegate {

    func tableView(_ tableView: UITableView, estimatedHeightForHeaderInSection section: Int) -> CGFloat {
        return 1000
    }

    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return UITableView.automaticDimension
    }

    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return header
    }

    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return 170
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
}
