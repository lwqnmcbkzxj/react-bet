//
//  MainSections.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum MainSection: String {
    case topBookmakers
    case topMatches
    case lastForecasts
    
    static func footerID() -> String {
        return "buttonFooter"
    }
    
    func headerId() -> String {
        return self.rawValue + "Header"
    }
    
    func cellId() -> String {
        return self.rawValue + "Cell"
    }
}
