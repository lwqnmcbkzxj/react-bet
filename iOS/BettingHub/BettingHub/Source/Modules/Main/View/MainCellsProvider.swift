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
    weak var forecastCellDelegate: ForecastCellDelegate!
    
    init(tableView: UITableView,
         dataProvider: MainScreenDataProvider,
         buttonFooterDelegate: ButtonFooterDelegate,
         forecastCellDelegate: ForecastCellDelegate) {
        self.tableView = tableView
        self.dataProvider = dataProvider
        self.buttonFooterDelegate = buttonFooterDelegate
        self.forecastCellDelegate = forecastCellDelegate
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
        cell.configure(with: data)
        return cell
    }
    
    func matchCell(row: Int, data: Match) -> UITableViewCell {
        let section = MainSection.topMatches
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! MatchCell
        let last = row == dataProvider.numberOfMatches() - 1
        cell.isLast(last)
        let match = dataProvider.dataForMatch(row: row)
        cell.configure(with: match)
        return cell
    }
    
    func forecastCell(row: Int, data: Forecast) -> UITableViewCell {
        let section = MainSection.lastForecasts
        let cell = tableView.dequeueReusableCell(withIdentifier: section.cellId()) as! ForecastCell
        let forecast = dataProvider.dataForForecast(row: row)
        cell.configure(with: forecast)
        cell.delegate = forecastCellDelegate
        return cell
    }
    
    func header(for sec: MainSection) -> UITableViewHeaderFooterView? {
        switch sec {
        case .topBookmakers:
            let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: sec.headerId()) as! TopBookmakersHeaderView
            header.titleLabel.text = sec == .topBookmakers ? Text.bookmakersRating : Text.topMatches
            if let mode = columnsMode(for: sec) {
                header.columnsHeaderView.setMode(mode)
            }
            header.arrowButton.isHidden = sec == .topBookmakers ? false : true
            return header
           
        case .topMatches:
            let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: sec.headerId()) as! TopMatchesHeaderView
            header.titleLabel.text = sec == .topBookmakers ? Text.bookmakersRating : Text.topMatches
            if let mode = columnsMode(for: sec) {
                header.columnsHeaderView.setMode(mode)
            }
            
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
        
        tableView.register(TopMatchesHeaderView.self,
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
    
    private func columnsMode(for section: MainSection) -> ColumnsView.Mode? {
        switch section {
        case .topBookmakers:
            return .bookmakers
        
        case .topMatches:
            return .matches
            
        default: return nil
        }
    }
}
