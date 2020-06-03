//
//  I HttpClient.swift
//  CryptoTest
//
//  Created by Maxim Bezdenezhnykh on 17.02.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

protocol IHttpClient: class {
    func request(request: URLRequest,
                 callback: ((Result<Data, Error>)->Void)?)
    
    //TODO: Delete when response codes added to server
    func authRequest(request: URLRequest,
                     callback: ((BHError?) -> Void)?)
    
    func multipart(request: URLRequest,
                   data: [String: Data],
                   callback: ((Result<Data, Error>)->Void)?)
}

