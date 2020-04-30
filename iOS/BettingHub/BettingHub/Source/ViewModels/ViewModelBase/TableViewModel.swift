//
//  TableViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class TableViewModel<Item, State> {
    
    var pageSize: Int { fatalError() }
    
    //State
    var state: State?
    
    func currentPage(_ page: Int) { fatalError() }
    
    //Binds
    var dataChanged: (()->Void)?
    
    var loadingStatusChanged: ((Bool)->Void)?
    
    //Getters
    var loadedPages: Int { fatalError() }
    
    func numberOfItems() -> Int { fatalError() }
    
    func item(for index: Int) -> Item { fatalError() }
}
