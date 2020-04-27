//
//  UITableVIew.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UITableView {
    
    func insert(indexPaths: [IndexPath]) {
        beginUpdates()
        batchIfPossible {
            let offset = contentOffset
            insertRows(at: indexPaths, with: .fade)
            setContentOffset(offset, animated: false)
        }
        endUpdates()
    }
    
    private func batchIfPossible(closure: ()->Void) {
        if #available(iOS 11, *) {
            performBatchUpdates(closure, completion: nil)
        } else {
            closure()
        }
    }
}
