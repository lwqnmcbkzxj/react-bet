//
//  CellsProvider.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainScreenCellsProvider {
    
    let tableView: UITableView
    
    weak var dataProvider: MainScreenDataProvider!
    weak var buttonFooterDelegate: ButtonFooterDelegate!
    
    init(tableView: UITableView, dataProvider: MainScreenDataProvider,
         buttonFooterDelegate: ButtonFooterDelegate) {
        self.tableView = tableView
        self.dataProvider = dataProvider
        self.buttonFooterDelegate = buttonFooterDelegate
        register()
    }
    
    func numberOfSections() -> Int {
        let sections = [dataProvider.numberOfBookmakers(),
                        dataProvider.numberOfMatches(),
                        dataProvider.numberOfForecasts()]
        return sections.filter { $0 != 0 }.count
    }
    
    func numberOfCells(at sec: MainSection) -> Int {
        return [
            MainSection.topBookmakers: { self.dataProvider.numberOfBookmakers() },
            MainSection.topMatches: { self.dataProvider.numberOfMatches() },
            MainSection.lastForecasts: { self.dataProvider.numberOfForecasts() }
        ][sec]!()
    }
    
    func cell(row: Int, section sec: MainSection) -> UITableViewCell {
        return [
            MainSection.topBookmakers:
                { self.bookmakerCell(row: row,
                                     data: self.dataProvider.dataForBookmaker(row: row)) },
            MainSection.topMatches:
                { self.matchCell(row: row,
                                 data: self.dataProvider.dataForMatch(row: row)) },
            MainSection.lastForecasts:
                { self.forecastCell(row: row,
                                    data: self.dataProvider.dataForForecast(row: row)) }
        ][sec]!()
    }
    
    func bookmakerCell(row: Int, data: Bookmaker) -> UITableViewCell {
        let section = MainSection.topBookmakers
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! BookmakerCell
        let last = row == dataProvider.numberOfBookmakers() - 1
        cell.isLast(last)
        return cell
    }
    
    func matchCell(row: Int, data: Match) -> UITableViewCell {
        let section = MainSection.topMatches
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! MatchCell
        let last = row == dataProvider.numberOfMatches() - 1
        cell.isLast(last)
        return cell
    }
    
    func forecastCell(row: Int, data: Forecast) -> UITableViewCell {
        let section = MainSection.lastForecasts
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! ForecastCell
        let forecast = dataProvider.dataForForecast(row: row)
        cell.configure(with: forecast)
        return cell
    }
    
    func header(for sec: MainSection) -> UITableViewHeaderFooterView? {
        switch sec {
        case .topBookmakers, .topMatches:
            let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: sec.headerId()) as! TopBookmakersHeaderView
            header.titleLabel.text = sec == .topBookmakers ? Text.bookmakersRating : Text.topMatches
            header.columnsHeaderView.setColumns(columns(for: sec),
                                                leftInset: 5,
                                                rightInset: 5)
            return header
            
        case .lastForecasts:
            let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: sec.headerId())
            return header
        }
    }
    
    func footer(for section: MainSection) -> UITableViewHeaderFooterView? {
        let footer = tableView.dequeueReusableHeaderFooterView(withIdentifier: MainSection.footerID()) as! ButtonFooter
        footer.configure(section: section, delegate: buttonFooterDelegate)
        return footer
    }
    
    
    private func register() {
        
        //Headers
        tableView.register(TopBookmakersHeaderView.self,
                           forHeaderFooterViewReuseIdentifier: MainSection.topBookmakers.headerId())
        
        tableView.register(TopBookmakersHeaderView.self,
                           forHeaderFooterViewReuseIdentifier: MainSection.topMatches.headerId())
        
        tableView.register(BigTitleHeader.self,
                           forHeaderFooterViewReuseIdentifier: MainSection.lastForecasts.headerId())
        
        //Footers
        tableView.register(ButtonFooter.self,
                           forHeaderFooterViewReuseIdentifier: MainSection.footerID())
        
        //Cells
        tableView.register(BookmakerCell.self,
                           forCellReuseIdentifier: MainSection.topBookmakers.cellId())
        
        tableView.register(MatchCell.self,
                           forCellReuseIdentifier: MainSection.topMatches.cellId())
        
        tableView.register(ForecastCell.self,
                           forCellReuseIdentifier: MainSection.lastForecasts.cellId())
    }
    
    private func columns(for section: MainSection) -> [ColumnsHeaderView.Column] {
        switch section {
        case .topBookmakers:
            return [
                .init(title: Text.firm, occupation: 0.31),
                .init(title: Text.rating, occupation: 0.2),
                .init(title: Text.bonus, occupation: 1 - 0.2 - 0.33)
            ]
        
        case .topMatches:
            let dateW = 0.135
            let matchW = 0.47
            let betsW = 1 - dateW - matchW
            return [
                .init(title: Text.date, occupation: dateW, alignment: .center),
                .init(title: Text.match, occupation: matchW, alignment: .center),
                .init(title: Text.bets, occupation: betsW, alignment: .right)
            ]
            
        default: return []
        }
    }
}
