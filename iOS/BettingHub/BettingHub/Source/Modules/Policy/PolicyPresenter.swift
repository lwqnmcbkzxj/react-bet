//
//  PolicyPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 25.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IPolicyPresenter: class {
    func loadPolicy(callback: ((String?)->Void)?)
}

class PolicyPresenter: IPolicyPresenter {
    
    @LazyInjected
    private var reqBuilder: IRequestBuilder
    
    @LazyInjected
    private var httpClient: IHttpClient
    
    func loadPolicy(callback: ((String?) -> Void)?) {
        let req = policyRequest().1
        httpClient.request(request: req) { (res) in
            switch res {
            case .success(let data): callback?(self.decodeResponse(data: data))
            case .failure(_): callback?(nil)
            }
        }
    }
    
    func policyRequest() -> (RequestContent, URLRequest) {
        let urlStr = "https://app.betthub.org/policy"
        let fullUrl = URL(string: urlStr)!
        let content = (urlStr, [String: String]())
        let req = reqBuilder.getRequest(fullUrl: fullUrl, params: content.1)
        return (content, req)
    }
    
    func decodeResponse(data: Data) -> String? {
        struct PolicyResponse: Decodable {
            let text: String
        }
        
        let res = try? data.decodeJSON(PolicyResponse.self).get().text
        return res
    }
}
