//
//  SocialAuthPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 12.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol ISocialAuthPresenter: class {
    
    func webPageRequest() -> URLRequest
}

class SocialAuthPresenter: ISocialAuthPresenter {
    
    let network: SocialNetwork
    
    init(network: SocialNetwork) {
        self.network = network
    }
    
    func webPageRequest() -> URLRequest {
        let urlStr =
        [
            SocialNetwork.vk: "https://app.betthub.org/api/login/vkontakte",
            SocialNetwork.google: "https://app.betthub.org/api/login/google",
            SocialNetwork.facebook: "https://app.betthub.org/api/login/facebook"
        ][network]!
        
        let url = URL(string: urlStr)!
        let req = URLRequest(url: url)
        
        return req
    }
}
