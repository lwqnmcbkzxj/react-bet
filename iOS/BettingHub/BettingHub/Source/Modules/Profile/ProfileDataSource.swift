//
//  ProfileDataSource.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol ProfileDataSource: UITableViewDataSource, UITableViewDelegate {
    
    func start()
    func reload()
}
