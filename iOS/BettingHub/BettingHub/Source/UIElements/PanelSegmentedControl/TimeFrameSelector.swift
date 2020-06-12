//
//  TimeFrameSelector.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TimeFrameSelector: PanelSegmenterControl {
    
    var selectedTimeFrame: TimeFrame? {
        get {
            guard let index = selectedSegment else { return nil }
            return timeFrameItems[index]
        }
        set {
            guard
                let tf = newValue,
                let index = timeFrameItems.firstIndex(of: tf)
            else {
                selectedSegment = nil
                return
            }
            selectedSegment = index
        }
    }
    
    private let timeFrameItems: [TimeFrame] = [.all, .month]
    
    init() {
        let items = timeFrameItems.map { $0.localized }
        super.init(items: items)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}