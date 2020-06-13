//
//  SocialAuthAssembly.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 12.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit


class SocialAuthAssembly {
    
    func module(social: SocialNetwork) -> UIViewController {
        let vc = SocialAuthViewController()
        let presenter = SocialAuthPresenter(network: social)
        
        vc.presenter = presenter
        
        return vc
    }
}
