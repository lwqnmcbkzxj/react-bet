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
            print(error)
            return .failure(.unexpectedContent)
        }
    }
    
    func decodePaged<ResponseModel: Decodable>(pageElement: ResponseModel.Type) -> ServiceResult<[ResponseModel]> {
        decodeJSON(PagedResponse<ResponseModel>.self).map { $0.data }
    }
}
