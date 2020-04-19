//
//  CellsProvider.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainCellsProvider {
    
    let tableView: UITableView
    
    weak var dataProvider: MainScreenDataProvider!
    
    init(tableView: UITableView, dataProvider: MainScreenDataProvider) {
        self.tableView = tableView
        self.dataProvider = dataProvider
    }
    
    func cell(indexPath: IndexPath) -> UITableViewCell {
        [
            0: { self.bookmakerCell(indexPath: indexPath,
                                    data: self.dataProvider.dataForBookmaker(row: indexPath.row)) },
            1: { self.matchCell(indexPath: indexPath,
                                data: self.dataProvider.dataForMatch(row: indexPath.row)) },
            2: { self.forecastCell(indexPath: indexPath,
                                   data: self.dataProvider.dataForForecast(row: indexPath.row)) }
        ][indexPath.section]!()
    }
    
    func bookmakerCell(indexPath: IndexPath, data: Bookmaker) -> UITableViewCell {
        let section = MainSection.topBookmakers
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! BookmakerCell
        let last = indexPath.row == tableView.numberOfRows(inSection: section.sectionIndex()) - 1
        cell.isLast(last)
        return cell
    }
    
    func matchCell(indexPath: IndexPath, data: Match) -> UITableViewCell {
        let section = MainSection.topMatches
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! MatchCell
        let last = indexPath.row == tableView.numberOfRows(inSection: section.sectionIndex()) - 1
        cell.isLast(last)
        return cell
    }
    
    func forecastCell(indexPath: IndexPath, data: Forecast) -> UITableViewCell {
        let section = MainSection.lastForecasts
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! ForecastCell
        return cell
    }
}
