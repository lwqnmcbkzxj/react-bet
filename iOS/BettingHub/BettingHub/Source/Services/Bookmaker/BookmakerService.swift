//
//  BookmakerService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class BookmakerService {
    
    @LazyInjected
    private var reqBuilder: IRequestBuilder
    
    @LazyInjected
    private var httpClient: IHttpClient
    
    func bookmakersRequest() -> (RequestContent, URLRequest) {
        let url = "api/bookmakers"
        let content = (url, [String: String]())
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    func bookmakerRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/bookmakers"
        let content = reqBuilder.idRequest(url: url, id: id)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
}

extension BookmakerService: IBookmakerService {
    
    func bookmakers(callback: (ServiceCallback<[Bookmaker]>)?) {
        let req = bookmakersRequest().1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data): callback?(data.decodeJSON([Bookmaker].self))
            case .failure(let err): callback?(.failure(err.asBHError()))
            }
        }
    }
    
    func bookmaker(id: Int, callback: (ServiceCallback<Bookmaker>)?) {
        let req = bookmakerRequest(id: id).1
        httpClient.request(request: req) { (result) in
            switch result {
            case .success(let data): callback?(data.decodeJSON(Bookmaker.self))
            case .failure(let err): callback?(.failure(err.asBHError()))
            }
        }
    }
}
