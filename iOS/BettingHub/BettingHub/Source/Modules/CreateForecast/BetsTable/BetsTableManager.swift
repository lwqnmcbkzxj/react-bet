//
//  BetsTableManager.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 28.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BetsTableManager: NSObject, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    
    let headerHeight: CGFloat = 31
    let cellHeight: CGFloat = 38
    
    private var data: BetsTableData?
    
    private let headerId = "columnHeaderCell"
    private let bkId = "bookmakerCell"
    private let coefId = "coefficientCell"
    
    init(collectionView: UICollectionView) {
        collectionView.register(BetsTableColumnHeaderCell.self, forCellWithReuseIdentifier: headerId)
        collectionView.register(BetsTableBookmakerCell.self, forCellWithReuseIdentifier: bkId)
        collectionView.register(BetsTableCoefficientCell.self, forCellWithReuseIdentifier: coefId)
    }
    
    func configure(with data: BetsTableData) {
        self.data = data
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        guard let data = data else { return 0 }
        let itemsInRow = data.columns.count + 1
        let rows = data.values.count + 1
        return itemsInRow * rows
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let data = data else { fatalError("No data provided but cells requested") }
        
        let itemsInRow = data.columns.count + 1
        
        let isHeader = indexPath.item < itemsInRow
        if isHeader {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: headerId,
                                                          for: indexPath) as! BetsTableColumnHeaderCell
            let isBookmakerHeader = indexPath.row == 0
            cell.label.text = isBookmakerHeader ? Text.bookmakerShort : data.columns[indexPath.row - 1]
            return cell
        }
        
        let rowNumber = indexPath.row / itemsInRow
        
        let isBookmaker = !isHeader && indexPath.row % itemsInRow == 0
        if isBookmaker {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: bkId,
                                                          for: indexPath) as! BetsTableBookmakerCell
            cell.imageView.setServerIcon(url: data.bookmakers[rowNumber - 1].image)
            return cell
        }
        
        let columnNumber = indexPath.row % itemsInRow
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: coefId,
                                                      for: indexPath) as! BetsTableCoefficientCell
        let coef = data.values[rowNumber - 1][columnNumber - 1]
        cell.label.text = String(format: "%.2f", coef)
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        guard
            let data = data,
            let layout = collectionViewLayout as? UICollectionViewFlowLayout
        else { return .zero }
        
        //height
        let itemsInRow = data.columns.count + 1
        let firstRow = indexPath.row < itemsInRow
        let height: CGFloat = firstRow ? headerHeight : cellHeight
        
        //width
        let coefColumnsCount = CGFloat(data.columns.count)
        let bookmakerWidth: CGFloat = 71
        let spaces = CGFloat(coefColumnsCount) * layout.minimumInteritemSpacing
        let firstColumn = indexPath.row % (1 + data.columns.count) == 0
        let width = firstColumn
                    ? bookmakerWidth
                    : (collectionView.bounds.width - spaces - bookmakerWidth) / coefColumnsCount
        
        return CGSize(width: width, height: height)
    }
}

private class BetsTableColumnHeaderCell: UICollectionViewCell {
    
    let label: UILabel = {
        let view = UILabel()
        view.font = .robotoRegular(size: 15)
        view.textColor = .textGrayDark
        view.textAlignment = .center
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        contentView.addSubview(label)
        label.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        backgroundColor = .lightGray
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

private class BetsTableCoefficientCell: UICollectionViewCell {
    
    let label: UILabel = {
        let view = UILabel()
        view.font = .robotoRegular(size: 15)
        view.textColor = .positiveGreen
        view.textAlignment = .center
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        contentView.addSubview(label)
        label.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        backgroundColor = .white
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

private class BetsTableBookmakerCell: UICollectionViewCell {
    
    let imageView: UIImageView = {
        let view = UIImageView()
        view.clipsToBounds = true
        view.layer.cornerRadius = 3
        view.contentMode = .scaleAspectFill
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        contentView.addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(8)
            make.bottom.equalToSuperview().offset(-8)
            make.width.equalTo(imageView.snp.height).multipliedBy(2.45)
            make.centerX.equalToSuperview()
        }
        
        backgroundColor = .white
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
