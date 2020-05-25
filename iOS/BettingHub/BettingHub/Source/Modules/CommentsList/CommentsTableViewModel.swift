//
//  CommentsTableViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

func onMainQueue(_ closure: @escaping () -> Void) {
    DispatchQueue.main.async {
        closure()
    }
}

protocol ICommentsTableViewModel: class {
    
    var reloadTableView: (() -> Void)? { get set }
    
    var updateLoadingStatus: (()->Void)? { get set }
    
    var isLoading: Bool { get }
    
    var numberOfRows: Int { get }
    
    func viewModelItem(for indexPath: IndexPath) -> CommentCellViewModelItem
}

class CommentsTableViewModel: ICommentsTableViewModel {
    
    var reloadTableView: (() -> Void)? = nil
    
    var updateLoadingStatus: (() -> Void)? = nil
    
    var isLoading: Bool = false {
        didSet { onMainQueue { self.updateLoadingStatus?() } }
    }
    
    var numberOfRows: Int { return items.count }
    
    init() {
//        let arr: [(Int, Int)] = [
//            (0, 0),
//            (1, 0),
//            (2, 0),
//            (3, 0),
//            (2, 1),
//            (0, 2),
//            (0, 0),
//            (1, 0),
//            (2, 0),
//            (0, 3),
//            (0, 0),
//            (1, 0),
//            (2, 0),
//            (0, 3),
//        ]
//        items = (0..<10).map({ (number) -> CommentCellViewModelItem in
//            .init(imageUrl: "", username: "Никнейм", date: "вчера в 16:58",
//                  comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
//                  rating: 23,
//                  longLines: arr[number].0,
//                  shortLines: arr[number].1)
//        })
    }
    
    func viewModelItem(for indexPath: IndexPath) -> CommentCellViewModelItem {
        return items[indexPath.row]
    }
    
    private var items: [CommentCellViewModelItem] = [] {
        didSet { onMainQueue { self.reloadTableView?() } }
    }
}
