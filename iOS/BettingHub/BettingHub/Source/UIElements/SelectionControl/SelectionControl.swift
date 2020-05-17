//
//  SelectionControll.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SelectionControl: UIControl {
    
    var selectedIndex: Int? {
        didSet {
            if selectedIndex ?? 0 > items.count,
               selectedIndex ?? 0 < 0 {
                fatalError("Index out of range")
            }
            
            let indexPath: IndexPath? = selectedIndex == nil ? nil
                : .init(row: selectedIndex!, section: 0)
            collection.selectItem(at: indexPath,
                                  animated: false,
                                  scrollPosition: .top)
            sendActions(for: .valueChanged)
        }
    }
    
    private(set) var items: [String] = []
    
    private let cellId = "selectionItemCell"
    
    private let collection: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.estimatedItemSize = .init(width: 60, height: 33)
        layout.minimumInteritemSpacing = 5
        layout.minimumLineSpacing = 10
        let collection = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collection.backgroundColor = .clear
        collection.clipsToBounds = false
        return collection
    }()
    
    init(items: [String]) {
        super.init(frame: .zero)
        
        addSubview(collection)
        collection.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        collection.register(SelectionControllItem.self, forCellWithReuseIdentifier: cellId)
        collection.dataSource = self
        collection.delegate = self
        
        configure(with: items)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with items: [String]) {
        self.items = items
        collection.reloadData()
    }
}

extension SelectionControl: UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return items.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! SelectionControllItem
        cell.label.text = items[indexPath.row]
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        selectedIndex = indexPath.row
        collectionView.collectionViewLayout.invalidateLayout()
    }
}

fileprivate class SelectionControllItem: UICollectionViewCell {
    
    override var isSelected: Bool {
        didSet {
            label.font = isSelected ? selectedFont : unselectedFont
            panel.isHidden = !isSelected
        }
    }
    
    private(set) lazy var label: UILabel = {
        let view = UILabel()
        view.textAlignment = .center
        view.font = unselectedFont
        view.textColor = .titleBlack
        view.text = "item"
        return view
    }()
    
    private let panel: UIView = {
        let view = UIItems.grayPanel
        view.isHidden = true
        return view
    }()
    
    private let selectedFont: UIFont = .robotoMedium(size: 16)
    private let unselectedFont: UIFont = .robotoRegular(size: 16)
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        contentView.addSubview(panel)
        panel.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        
        contentView.addSubview(label)
        label.snp.contentHuggingHorizontalPriority = 1000
        label.snp.contentCompressionResistanceHorizontalPriority = 1000
        label.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(10)
            make.trailing.equalToSuperview().offset(-10)
            make.height.equalTo(33)
        }
    }
}
