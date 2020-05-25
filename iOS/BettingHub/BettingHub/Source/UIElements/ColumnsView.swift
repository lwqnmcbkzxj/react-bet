//
//  ColumnsView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension ColumnsView {
    
    enum Mode {
        case bookmakers
        case matches
        case forecasters
        case lastBets
    }
    
    struct Column {
        let title: String
        let occupation: Double
        let alignment: NSTextAlignment
        
        init(title: String, occupation: Double, alignment: NSTextAlignment = .center) {
            self.title = title
            self.occupation = occupation
            self.alignment = alignment
        }
        
        static var spacer: Column {
            return .init(title: "", occupation: -1)
        }
    }
}

class ColumnsView: UIView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .lightGray
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setMode(_ mode: Mode) {
        switch mode {
        case .bookmakers:
            let columns = [
                Column(title: Text.firm, occupation: 0.3125, alignment: .left),
                Column(title: Text.rating, occupation: 0.2),
                Column(title: Text.bonus, occupation: 0.2),
                Column.spacer
            ]
            setColumns(columns)
        
        case .matches:
            let dateW = 0.135
            let matchW = 0.47
            let betsW = 1 - dateW - matchW
            let columns = [
                Column(title: Text.date, occupation: dateW, alignment: .center),
                Column(title: Text.match, occupation: matchW, alignment: .center),
                Column(title: Text.bets, occupation: betsW, alignment: .right)
            ]
            setColumns(columns)
            
        case .forecasters:
            let columns = [
                Column(title: "№", occupation: 0.15, alignment: .center),
                Column(title: Text.name, occupation: 0.35, alignment: .left),
                Column(title: "W/L/D", occupation: 0.28, alignment: .center),
                Column(title: Text.incomeWord, occupation: 0.22, alignment: .right)
            ]
            setColumns(columns)
            
        case.lastBets:
            let columns = [
                Column(title: Text.forecaster, occupation: 0.46, alignment: .left),
                Column(title: Text.bet, occupation: 0.24),
                Column(title: Text.passability, occupation: 0.3)
            ]
            setColumns(columns)
        }
    }
    
    func setColumns(_ columns: [Column], leftInset: CGFloat = 5, rightInset: CGFloat = 5) {
        subviews.forEach { $0.removeFromSuperview() }
        
        let labels = columns.map { (column) -> UILabel in
            let label = UILabel()
            label.textColor = .textGrayDark
            label.font = .robotoRegular(size: 13)
            return label
        }
        
        var numberOfSpacers = 0.0
        
        let sum = columns.reduce(0.0) { (res, column) -> Double in
            if column.occupation >= 0 {
                return res + column.occupation
            }
            numberOfSpacers += 1
            return 0
        }
        
        if sum > 1 { fatalError("Columns occupations sum > 1") }
        
        if numberOfSpacers == 0 {
            numberOfSpacers = 1
        }
        
        let spacerOccupation = (1 - sum) / numberOfSpacers
        
        for i in 0..<columns.count {
            let label = labels[i]
            let column = columns[i]
            
            label.text = column.title
            label.textAlignment = column.alignment
            
            addSubview(label)
            label.snp.makeConstraints { (make) in
                
                make.top.equalToSuperview().offset(5)
                make.bottom.equalToSuperview()
                
                
                
                if i == 0 {
                    make.leading.equalToSuperview().offset(leftInset)
                } else {
                    make.leading.equalTo(labels[i-1].snp.trailing)
                }
                
                if column.occupation == -1 { //spacer
                    make.width.equalToSuperview().multipliedBy(spacerOccupation / 1).priority(.high)
                }
                
                if i == columns.count - 1 {
                    make.trailing.equalToSuperview().offset(-rightInset)
                } else {
                    if column.occupation > 0 {
                        make.width.equalToSuperview().multipliedBy(column.occupation / 1)
                    }
                }
            }
        }
    }
}
