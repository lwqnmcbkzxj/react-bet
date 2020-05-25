//
//  SportService.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 13.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

class SportService {
    
    @LazyInjected private var httpClient: IHttpClient
    @LazyInjected private var reqBuilder: IRequestBuilder
    
    private(set) var isLoading: Bool = false
    
    func sportsRequest() -> (RequestContent, URLRequest) {
        let endpoint = "api/sports"
        let params = [String: String]()
        let content = (endpoint, params)
        let req = reqBuilder.getRequest(content: content)
        return (content, req)
    }

    private let storedDefaultsKey = "kStoredSports"

    private func storedFromDefaults() -> [Sport]? {
        guard
            let data = UserDefaults.standard.value(forKey: storedDefaultsKey) as? Data,
            let sports = try? JSONDecoder().decode([Sport].self, from: data)
        else { return nil }

        return sports
    }

    private func saveToDefaults(_ sports: [Sport]) {
        guard let data = try? JSONEncoder().encode(sports) else { return }
        UserDefaults.standard.setValue(data, forKey: storedDefaultsKey)
    }
    
    private var loadedSports: [Sport] = [] {
        didSet {
            saveToDefaults(loadedSports)
        }
    }
}

extension SportService: ISportService {
    
    var currentSports: [Sport] { [.all] + loadedSports }
    
    func updateKnownSports(callback: @escaping ()->Void) {
        loadedSports = storedFromDefaults() ?? []
        
        let req = sportsRequest().1
        
        isLoading = true
        httpClient.request(request: req) { [weak self] (result) in
            switch result {
            case .success(let data):
                guard let sports = try? JSONDecoder().decode([Sport].self, from: data) else {
                    callback()
                    return
                }
                
                self?.loadedSports = sports
                self?.isLoading = false
                callback()
                
            case .failure(_):
                callback()
            }
        }
    }
}
