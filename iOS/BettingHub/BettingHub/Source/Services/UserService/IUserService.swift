//
//  IUserService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IUserService: class {
    
    func addDelegate(_ delegate: IUserServiceDelegate)
    
    func removeDelegate(_ delegate: IUserServiceDelegate)
    
    var currentUserInfo: UserInfo? { get }
    
    func reloadInfo(callback: ((BHError?)->Void)?)
    
    func clearInfo()
    
    func uploadAvatar(data: Data)
}

protocol IUserServiceDelegate: class {
    
    func dataChanged(userService: IUserService)
}
