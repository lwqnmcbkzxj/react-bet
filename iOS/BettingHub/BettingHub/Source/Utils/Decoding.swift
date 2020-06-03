//
//  Decoding.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

struct PagedResponse<T: Decodable>: Decodable {
    let data: [T]
}

extension Data  {
    
    func decodeJSON<T: Decodable>(_ model: T.Type,
                                  with decoder: JSONDecoder = JSONDecoder()) -> Result<T, BHError> {
        do {
            let decoded = try decoder.decode(T.self, from: self)
            return .success(decoded)
        } catch {
            print("\(String(describing: T.self)) decoding error")
            print(error)
            print(prettyPrintedJSONString ?? "")
            return .failure(.unexpectedContent)
        }
    }
    
    func decodePaged<ResponseModel: Decodable>(pageElement: ResponseModel.Type) -> ServiceResult<[ResponseModel]> {
        decodeJSON(PagedResponse<ResponseModel>.self).map { $0.data }
    }
    
    func decodePagedOrNil<ResponseModel: Decodable>(pageElement: ResponseModel.Type) -> [ResponseModel]? {
        try? decodeJSON(PagedResponse<ResponseModel>.self).map { $0.data }.get()
    }
    
    var prettyPrintedJSONString: NSString? {
        guard
            let object = try? JSONSerialization.jsonObject(with: self, options: []),
            let data = try? JSONSerialization.data(withJSONObject: object,
                                                   options: [.prettyPrinted]),
            let prettyPrintedString = NSString(data: data,
                                               encoding: String.Encoding.utf8.rawValue)
        else { return nil }

        return prettyPrintedString
    }
}
