//
//  ServiceLocator.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation


class ServiceLocator {
    
    func resolve<Service>(_ service: Service.Type) -> Service {
        guard let resolution = container.resolve(Service.self) else {
            fatalError("Can not resolve service for type \(service)")
        }
        
        return resolution
    }
    
    private let container = Container()
    
    static let shared = ServiceLocator()
    
    private init() {
        container.register(IRequestBuilder.self) { RequestBuilder() }
        container.register(IHttpClient.self) { HttpClient() }
        container.register(ITokenService.self) { TokenService() }
        container.register(IAuthService.self) { AuthService() }
        container.register(IForecastService.self) { ForecastService() }
        container.register(ISportService.self) { SportService() }
        container.register(IForecasterService.self) { ForecasterService() }
        container.register(IMatchService.self) { MatchService() }
        container.register(IUserService.self) { UserService() }
        container.register(IBookmakerService.self) { BookmakerService() }
        container.register(IArticleService.self) { ArticleService() }
    }
}

private class Container {
    private var resolutionsMap: [String: Any] = [:]
    
    func register<Interface>(_ interface: Interface.Type, registrationBlock: ()->Interface) {
        let id = String(describing: interface)
        let implementation = registrationBlock()
        resolutionsMap[id] = implementation
    }
    
    func resolve<Interface>(_ interface: Interface.Type) -> Interface? {
        let id = String(describing: interface)
        return resolutionsMap[id] as? Interface
    }
}
