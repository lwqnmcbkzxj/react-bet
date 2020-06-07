//
//  TableSectionProvider.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol TableSectionProvider: class {
    
    //optional
    
    func header() -> UIView?
    
    func headerHeight() -> CGFloat
    
    func headerEstimatedHeight() -> CGFloat
    
    func footer() -> UIView?
    
    func footerHeight() -> CGFloat
    
    func footerEstimatedHeight() -> CGFloat
    
    
    func cellHeight() -> CGFloat
    
    func estimatedCellHeight() -> CGFloat
    
    func reload()
    
    //required
    
    func numberOfCells() -> Int
    
    func cell(for row: Int) -> UITableViewCell
}

extension TableSectionProvider {
    
    func header() -> UIView? { nil }
    
    func headerHeight() -> CGFloat { UITableView.automaticDimension }
    
    func headerEstimatedHeight() -> CGFloat { 50 }
    
    func footer() -> UIView? { nil }
    
    func footerHeight() -> CGFloat { UITableView.automaticDimension }
    
    func footerEstimatedHeight() -> CGFloat { 50 }
    
    func cellHeight() -> CGFloat { UITableView.automaticDimension }
    
    func estimatedCellHeight() -> CGFloat { 50 }
    
    func reload() {}
}
