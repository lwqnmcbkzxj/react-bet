//
//  ForecastTypePicker.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

enum ForecastType: String {
    case ordinar
    case express
    
    func name() -> String {
        switch self {
        case .ordinar: return Text.ordinar
        case .express: return Text.express
        }
    }
}

class ForecastTypePicker: PanelPicker {
    
    var pickedType: ForecastType? {
        get {
            guard let index = selectedItem else { return nil }
            return types[index]
        }
        set {
            guard let type = newValue else {
                selectedItem = nil
                return
            }
            
            selectedItem = types.firstIndex(where: { $0 == type })
        }
    }
    
    let types: [ForecastType] = [
        .ordinar, .express
    ]
    
    init() {
        let items = types.map { $0.name() }
        super.init(items: items)
        pickedType = .ordinar
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
