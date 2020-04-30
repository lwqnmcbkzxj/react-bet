//
//  TimeFrameControl.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TimeFramePicker: TimePicker {
    
    var pickedTimeFrame: TimeFrame? {
        guard let index = selectedItem else { return nil }
        return timeFrames[index]
    }
    
    let timeFrames: [TimeFrame] = [
        .h3, .h6, .h12, .day, .all
    ]
    
    init() {
        let items = timeFrames.map { $0.localized }
        super.init(items: items)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
