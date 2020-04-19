//
//  MainView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MainView: UIView {
    
    let tableView: UITableView = {
        let table = UITableView(frame: .zero, style: .grouped)
        table.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        table.backgroundColor = .clear
        table.separatorColor = .clear
        return table
    }()
    
    let tableHeader: TopForecastersView = {
        let header = TopForecastersView()
        return header
    }()
    
    init() {
        super.init(frame: .zero)
        backgroundColor = .white
        setupTableHeader()
        setupTableView()
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupTableHeader() {
        tableHeader.frame = .init(x: 0, y: 0, width: 0, height: 299)
        tableView.tableHeaderView = tableHeader
    }
    
    private func setupTableView() {
        
        //Headers
        tableView.register(TopBookmakersHeaderView.self,
                           forHeaderFooterViewReuseIdentifier: MainSection.topBookmakers.headerId())
        
        tableView.register(TopBookmakersHeaderView.self,
                           forHeaderFooterViewReuseIdentifier: MainSection.topMatches.headerId())
        
        tableView.register(LastForecastsHeaderView.self,
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
        
        tableView.delegate = self
    }
    
    private func header(for number: Int) -> UITableViewHeaderFooterView? {
        switch number {
        case 0, 1:
            let section = MainSection.section(for: number)
            let id = section.headerId()
            let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: id) as! TopBookmakersHeaderView
            header.titleLabel.text =  number == 0 ? Text.bookmakersRating : Text.topMatches
            header.columnsHeaderView.setColumns(columns(for: section),
                                                leftInset: 5,
                                                rightInset: 5)
            return header
            
        case 2 :
            let section = MainSection.section(for: number)
            let id = section.headerId()
            let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: id)
            return header
        default: return nil
        }
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
    
    private func footer(for number: Int) -> UITableViewHeaderFooterView? {
        let header = tableView.dequeueReusableHeaderFooterView(withIdentifier: MainSection.footerID())
        return header
    }
    
    private func makeLayout() {
        addSubview(tableView)
        tableView.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(15)
            make.trailing.equalToSuperview().offset(-15)
        }
    }
}

extension MainView: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return header(for: section)
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        let heights: [Int: CGFloat] =
        [
            0: 79,
            1: 79,
            2: 52
        ]
        return heights[section]!
    }
    
    func tableView(_ tableView: UITableView, estimatedHeightForHeaderInSection section: Int) -> CGFloat {
        return 70
    }
    
    
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return footer(for: section)
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 98
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let heights: [Int: CGFloat] =
        [
            0: 64,
            1: 53,
            2: 422
        ]
        return heights[indexPath.section]!
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print(indexPath.row)
    }
}
