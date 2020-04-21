//
//  Device.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import DeviceKit

class DeviceInfo {
    
    static let shared = DeviceInfo()
    
    var smallScreen: Bool {
        let smallDevices: [Device] = [.iPhone5, .iPhone5s, .iPhone5c, .iPhoneSE]
        let smallSimulators: [Device] = smallDevices.map { .simulator($0) }
        return (smallDevices + smallSimulators).contains(Device.current)
    }
    
    private init() {}
}
