//
//  HttpClientImplementation.swift
//  CryptoTest
//
//  Created by Maxim Bezdenezhnykh on 18.02.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation
import Alamofire

class HttpClient: IHttpClient {
    
    func request(request: URLRequest, callback: ((Result<Data, Error>) -> Void)?) {
        AF.request(request).responseData { (res) in
            if let err = res.error
            {
                callback?(.failure(err))
                return
            }
            
            if res.response?.statusCode != 200 {
                //TODO: will handle errors useing response codes when added to server
            }
            
            guard let data = res.data else {
                let err = AFError.responseSerializationFailed(reason: .inputDataNilOrZeroLength)
                callback?(.failure(err))
                return
            }
            
            callback?(.success(data))
        }
    }
    
    func authRequest(request: URLRequest, callback: ((BHError?) -> Void)?) {
        AF.request(request).responseData { (afRes) in
            if afRes.response?.statusCode == 200 {
                callback?(nil)
            } else if afRes.response?.statusCode == 422 {
                callback?(.userAlreadyRegistered)
            } else {
                callback?(.unspecified)
            }
        }
    }
}
