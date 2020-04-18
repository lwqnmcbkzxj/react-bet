//
//  MainScreenDataProvider.swift
//  
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//

import Foundation

class MainScreenDataProvider {
    
    func dataForBookmaker(row: Int) -> Bookmaker {
        return Bookmaker()
    }
    
    func dataForMatch(row: Int) -> Match {
        return Match()
    }
    
    func dataForForecast(row: Int) -> Forecast {
        return Forecast()
    }
}
