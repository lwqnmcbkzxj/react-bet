//
//  CommentsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

struct CommentCellViewModelItem {
    let imageUrl: String
    let username: String
    let date: String
    let comment: String
    let rating: Int
    
    let longLines: Int
    let shortLines: Int
}

class CommentsViewModel: TableSectionProvider {
    
    private weak var tableView: UITableView!
    
    private let cellId = "commentCell"
    
    private let headerView: UIView = {
        let view = CommentsSectionHeader()
        view.configure(commentsCount: 16)
        return view
    }()
    
    private var items: [CommentCellViewModelItem] = {
        let arr: [(Int, Int)] = [
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (2, 1),
            (0, 2),
            (0, 0),
            (1, 0),
            (2, 0),
            (0, 3),
            (0, 0),
            (1, 0),
            (2, 0),
            (0, 3),
        ]
        let items = (0..<10).map({ (number) -> CommentCellViewModelItem in
            .init(imageUrl: "", username: "Никнейм", date: "вчера в 16:58",
                  comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
                  rating: 23,
                  longLines: arr[number].0,
                  shortLines: arr[number].1)
        })
        return items
    }()
    
    init(tableView: UITableView) {
        self.tableView = tableView
        
        tableView.register(CommentCell.self, forCellReuseIdentifier: cellId)
    }
    
    func header() -> UIView? {
        return headerView
    }
    
    func headerHeight() -> CGFloat {
        return 60
    }
    
    func numberOfCells() -> Int {
        return items.count
    }
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! CommentCell
        cell.configure(with: items[row])
        return cell
    }
}
