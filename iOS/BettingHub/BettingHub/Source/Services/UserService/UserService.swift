//
//  UserService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class UserService {
    
    @LazyInjected
    private var reqBuilder: IRequestBuilder
    
    @LazyInjected
    private var httpClient: IHttpClient
    
    @LazyInjected
    private var forecasterService: IForecasterService
    
//    @LazyInjected
//    private var persistantStorage: IPersistantDefaultsService
    
//    private let delegates = MulticastDelegate<IUserServiceDelegate>()
    
    private var _userInfo: UserInfo = UserInfo(forecaster: nil)
    
    func userInfoRequest() -> (URLRequest?, BHError?) {
        let url = "api/users/profile"
        let content = (url, [String: String]())
        let req = reqBuilder.getRequest(content: content)
        let authorized = reqBuilder.authorize(req)
        return (authorized, authorized == nil ? .userUnauthorized : nil)
    }
    
    func uploadAvatarRequest() -> URLRequest {
        let url = "api/avatar"
        let content = RequestContent(url, [:])
        let req = reqBuilder.jsonPostRequest(content: content)
        let auth = reqBuilder.authorize(req) ?? req
        return auth
    }
}

extension UserService: IUserService {
    
//    func addDelegate(_ delegate: IUserServiceDelegate) {
//        delegates.add(delegate: delegate)
//    }
//    
//    func removeDelegate(_ delegate: IUserServiceDelegate) {
//        delegates.remove(delegate: delegate)
//    }
    
    var currentUserInfo: UserInfo {
        return _userInfo
    }
    
    func reloadInfo(callback: ((BHError?) -> Void)?) {
        let (req, err) = userInfoRequest()
        
        if let err = err { callback?(err) }
        
        guard let request = req else {
            callback?(.unspecified)
            return
        }
        
        httpClient.request(request: request) { (result) in
            let mapped = result
                .map { $0.decodeJSONOrNil(UserInfoApiObject.self)! }
                .mapError { $0.asBHError() }
            
            switch mapped {
            case .success(let obj):
                if self.currentUserInfo.forecaster.data == nil { //loaded profile
                    let user = self.userInfo(from: obj)
                    self.currentUserInfo.forecaster.data = user.forecaster.data
                } else { //reload
                    self.applyChanges(to: self.currentUserInfo, from: obj)
                }
                
                callback?(nil)
                
            case .failure(let err):
                print(err)
                callback?(err)
            }
        }
        
//        httpClient.request(request: request) { (result) in
//            switch result {
//            case .success(let data):
//                guard let userData = try? JSONDecoder().decode(UserInfo.self, from: data) else {
//                    self._userInfo = self.persistantStorage.get(UserInfo.self)
//                    callback?(.unexpectedContent)
//                    return
//                }
//                self.persistantStorage.save(userData)
//                self._userInfo = userData
//
//                self.delegates.invoke { (delegate) in
//                    delegate.dataChanged(userService: self)
//                }
//
//                callback?(nil)
//
//            case .failure(let err):
//                callback?(err.asBHError())
//            }
//        }
    }
    
    func clearInfo() {
        _userInfo.forecaster.data = nil
    }
    
    func uploadAvatar(data: Data) {
        guard let _ = currentUserInfo.forecaster.data else { return }
        
        let req = uploadAvatarRequest()
        httpClient.multipart(request: req,
                             data: ["avatar": data])
        { (result) in
            result.onSuccess { (data) in
                self.reloadInfo(callback: nil)
            }.onFailure { (err) in
                print(err)
            }
        }
    }
}

extension UserService {
    
    func userInfo(from obj: UserInfoApiObject) -> UserInfo {
        let forecaster = forecasterService.createOrUpdate(obj: obj.forecaster)
        return UserInfo(forecaster: forecaster)
    }
    
    func applyChanges(to info: UserInfo, from obj: UserInfoApiObject) {
        info.forecaster.data?.avatar.data = obj.forecaster.avatar
        info.forecaster.data?.login.data = obj.forecaster.login
        info.forecaster.data?.stats.data = obj.forecaster.stats
        info.forecaster.data?.lastForecasts.data = obj.forecaster.lastForecasts
        info.forecaster.data?.ratingPosition.data = obj.forecaster.ratingPosition
        info.forecaster.data?.balance.data = obj.forecaster.balance
        info.forecaster.data?.subscribed.data = obj.forecaster.subscribed
    }
}
