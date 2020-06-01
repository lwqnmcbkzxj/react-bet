//
//  TimeFrameControl.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TimeFramePicker: PanelPicker {
    
    var pickedTimeFrame: TimeFrame? {
        get {
            guard let index = selectedItem else { return nil }
            return timeFrames[index]
        }
        set {
            guard let frame = newValue else {
                selectedItem = nil
                return
            }
            
            selectedItem = timeFrames.firstIndex(where: { $0 == frame })
        }
    }
    
    let timeFrames: [TimeFrame] = [
        .month, .all
    ]
    
    init() {
        let items = timeFrames.map { $0.localized }
        super.init(items: items)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
