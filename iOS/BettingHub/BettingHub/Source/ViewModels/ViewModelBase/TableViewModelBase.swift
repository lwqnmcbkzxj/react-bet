//
//  TableViewModelBase.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class TableViewModelImplementation<Item, State>: TableViewModel<Item, State> {
    
    override var state: State? {
        didSet { stateChanged() }
    }
    
    //Basic implementation
    
    override var loadedPages: Int {
        let fullPages = numberOfItems() / pageSize
        let lastIsIncomplete = (numberOfItems() % pageSize) > 0
        return fullPages + (lastIsIncomplete ? 1 : 0)
    }
    
    override func numberOfItems() -> Int { items.count }
    
    override func item(for index: Int) -> Item { items[index] }

    var items: [Item] = [] {
        didSet { dataChanged?() }
    }
    
    var isLoading: Bool = false {
        didSet { loadingStatusChanged?(isLoading) }
    }
    
    //Implementation overrides
    
    /// Provide value if paging supported by view model.
    override var pageSize: Int { fatalError() }
    
    /// Implement when paging supported by view model
    /// - Parameter page: The page needed to be presented.
    override func currentPage(_ page: Int) {
        fatalError("Provide page changing logic")
    }
    
    /// Implement if view model has any state other than current page.
    func stateChanged() { fatalError("Provide state changing logic") }
}
