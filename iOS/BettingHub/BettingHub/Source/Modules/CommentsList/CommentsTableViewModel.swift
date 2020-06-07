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
    }
    
    func viewModelItem(for indexPath: IndexPath) -> CommentCellViewModelItem {
        return items[indexPath.row]
    }
    
    private var items: [CommentCellViewModelItem] = [] {
        didSet { onMainQueue { self.reloadTableView?() } }
    }
}
