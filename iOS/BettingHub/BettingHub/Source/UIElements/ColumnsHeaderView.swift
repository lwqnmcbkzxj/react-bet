//
//  ColumnsHeaderView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension ColumnsHeaderView {
    
    struct Column {
        let title: String
        let occupation: Double
        let alignment: NSTextAlignment
        
        init(title: String, occupation: Double, alignment: NSTextAlignment = .left) {
            self.title = title
            self.occupation = occupation
            self.alignment = alignment
        }
    }
}

class ColumnsHeaderView: UIView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .lightGray
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setColumns(_ columns: [Column], leftInset: CGFloat = 5, rightInset: CGFloat = 5) {
        subviews.forEach { $0.removeFromSuperview() }
        
        let sum = columns.reduce(0.0) { return $0 + $1.occupation }
        let labels = columns.map { (column) -> UILabel in
            let label = UILabel()
            label.textColor = .textGrayDark
            label.font = .robotoRegular(size: 13)
            return label
        }
        
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
                
                if i == columns.count - 1 {
                    make.trailing.equalToSuperview().offset(-rightInset)
                } else {
                    make.width.equalToSuperview().multipliedBy(column.occupation / sum)
                }
            }
        }
    }
}
