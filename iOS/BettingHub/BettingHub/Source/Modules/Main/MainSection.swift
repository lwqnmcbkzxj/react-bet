//
//  MainSections.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation

enum MainSection: String {
    case topBookmakers, topMatches, lastForecasts
    
    static func section(for index: Int) -> MainSection {
        [
            0: .topBookmakers,
            1: .topMatches,
            2: .lastForecasts
        ][index]!
    }
    
    func sectionIndex() -> Int {
        [
            .topBookmakers: 0,
            .topMatches: 1,
            .lastForecasts: 2
        ][self] ?? 0
    }
    
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
