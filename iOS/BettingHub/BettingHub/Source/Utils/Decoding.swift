//
//  Decoding.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation


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
}

