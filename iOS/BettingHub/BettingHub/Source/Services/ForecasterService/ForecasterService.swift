//
//  ForecasterService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class ForecasterService {
    
    @LazyInjected private var reqBuilder: IRequestBuilder
    @LazyInjected private var httpClient: IHttpClient
    @LazyInjected private var authService: IAuthService
    
    var forecasters: [Int: Forecaster] = [:]
    
    func forecastersListRequest(page: Int, count: Int,
                                sport: Sport, time: TimeFrame) -> (RequestContent, URLRequest) {
        let url = "api/users"
        let content = reqBuilder.pagedRequest(url: url, page: page, limit: count)
        
        let paramed = reqBuilder.addParams(to: content,
                                           params: ["time": time.getLengthInHours().description,
                                                    "sport_id": sport.id.description])
        let req = reqBuilder.getRequest(content: paramed)
        return (content, req)
    }
    
    func forecasterRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/users/\(id)"
        let params = [String: String]()
        let content = (url, params)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }
    
    func subscribeRequest(id: Int) -> (RequestContent, URLRequest) {
        let url = "api/users/\(id)/subscription"
        let params = [String: String]()
        let content = (url, params)
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return (content, auth)
    }
}

extension ForecasterService: IForecasterService {
    
    func handledForecaster(id: Int) -> Forecaster? {
        return forecasters[id]
    }
    
    func createOrUpdate(obj: ForecasterApiObject) -> Forecaster {
        if let current = self.forecasters[obj.id] {
            self.applyUpdates(from: obj, to: current)
            return current
        } else {
            let new = self.forecaster(from: obj)
            self.forecasters[obj.id] = new
            return new
        }
    }
    
    func topForecasters(page: Int, count: Int,
                        sport: Sport, time: TimeFrame,
                        callback: ((Result<[Forecaster], BHError>) -> Void)?) {
        let req = forecastersListRequest(page: page, count: count, sport: sport, time: time).1
        
        httpClient.request(request: req) { (result) in
            
            let mapped = result
                .map { $0.decodePagedOrNil(pageElement: ForecasterApiObject.self)}
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let forecasterObjs):
                let arr = forecasterObjs?.map { self.createOrUpdate(obj: $0) }
                callback?(.success(arr ?? []))
                
            case .failure(let err):
                callback?(.failure(err))
            }
        }
    }
    
    func forecaster(id: Int, callback: ((Result<Forecaster, BHError>) -> Void)?) {
        let req = forecasterRequest(id: id).1
        httpClient.request(request: req) { (result) in
            let mapped = result
                .map { $0.decodeJSONOrNil(ForecasterApiObject.self) }
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let obj):
                guard let obj = obj else {
                    callback?(.failure(.unexpectedContent))
                    return
                }
                
                let forecaster = self.createOrUpdate(obj: obj)
                callback?(.success(forecaster))
                
            case .failure(let err):
                callback?(.failure(err))
            }
        }
    }
    
    func subscribe(forecaster: Forecaster) {
        if authService.authError != nil { return }
        let req = subscribeRequest(id: forecaster.id).1
        
        let subscribed = forecaster.subscribed.data
        
        //apply local instant changes
        forecaster.subscribed.data.toggle()
        forecaster.subscribers.data += subscribed ? -1 : 1
        
        
        httpClient.request(request: req) { (result) in
            result.onSuccess { (_) in
                //reload data from server
                self.forecaster(id: forecaster.id, callback: nil)
            }.onFailure { (err) in
                print(err)
            }
        }
    }
}

extension ForecasterService {
    
    func forecaster(from obj: ForecasterApiObject) -> Forecaster {
        .init(id: obj.id,
              avatar: obj.avatar,
              login: obj.login,
              stats: obj.stats,
              lastForecasts: obj.lastForecasts,
              ratingPosition: obj.ratingPosition,
              balance: obj.balance,
              subscribed: obj.subscribed,
              subscribers: obj.subscribers,
              subscriptions: obj.subscriptions)
    }
    
    func applyUpdates(from obj: ForecasterApiObject, to forecaster: Forecaster) {
        if obj.id != forecaster.id { fatalError() }
        
        forecaster.avatar.data = obj.avatar
        forecaster.login.data = obj.login
        forecaster.stats.data = obj.stats
        forecaster.lastForecasts.data = obj.lastForecasts
        forecaster.ratingPosition.data = obj.ratingPosition
        forecaster.balance.data = obj.balance
        forecaster.subscribed.data = obj.subscribed
    }
}
