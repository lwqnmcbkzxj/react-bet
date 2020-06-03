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
            if afRes.response?.statusCode == 200
            || afRes.response?.statusCode == 201 {
                callback?(nil)
            } else if afRes.response?.statusCode == 422 {
                callback?(.userAlreadyRegistered)
            } else {
                callback?(.unspecified)
            }
        }
    }
    
    func multipart(request: URLRequest,
                   data: [String: Data],
                   callback: ((Result<Data, Error>) -> Void)?) {
        
        AF.upload(multipartFormData: { (formData) in
            for key in data.keys {
                guard let dataEntry = data[key] else { continue }
                formData.append(dataEntry, withName: key,
                                fileName: "avatar.png", mimeType: "file")
            }
        }, with: request).responseData { (response) in
            if let err = response.error {
                callback?(.failure(err))
                return
            }
            
            guard let data = response.data else {
                callback?(.failure(BHError.unexpectedContent))
                return
            }
            callback?(.success(data))
        }
    }
}
