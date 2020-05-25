//
//  TopForecastersView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SkeletonView

protocol TopForecasterViewDelegate: class {
    
    func forecasterTapped(_ forecaster: Forecaster)
}

class TopForecastersView: UIView {
    
    weak var delegate: TopForecasterViewDelegate?
    
    private let cellID = "fcCellID"
    
    private var forecasters: [Forecaster] = []
    
    private let titleLabel: UILabel = {
        let label = UILabel()
        label.textAlignment = .center
        label.text = Text.topForecasters
        label.font = .robotoMedium(size: 20)
        label.textColor = .titleBlack
        return label
    }()
    
    private let collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 32
        layout.minimumLineSpacing = 32
        layout.itemSize = .init(width: 62, height: 100)
        layout.scrollDirection = .horizontal
        layout.sectionInset = .zero
        let collection = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collection.backgroundColor = .white
        collection.showsVerticalScrollIndicator = false
        collection.showsHorizontalScrollIndicator = false
        collection.isSkeletonable = true
        return collection
    }()
    
    private let scrollIndicator = OrangeScrollIndicator()
    
    let button: BottomButton = {
        let button = BottomButton(whiteStyle: false)
        button.setTitle(Text.showAll, for: .normal)
        return button
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setData(forecasters: [Forecaster]) {
        self.forecasters = forecasters
        collectionView.defaultHideSkeleton()
        collectionView.reloadData()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        scrollIndicator.reload()
    }
    
    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        collectionView.showAnimatedSkeleton()
    }
    
    private func configure() {
        scrollIndicator.attach(to: collectionView, direction: .horizontal)
        collectionView.register(TopForecasterCell.self, forCellWithReuseIdentifier: cellID)
        collectionView.dataSource = self
        collectionView.delegate = self
    }
    
    private func makeLayout() {
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalToSuperview().offset(27)
            make.height.equalTo(26)
        }
        
        addSubview(collectionView)
        collectionView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(titleLabel.snp.bottom).offset(22)
        }
        
        addSubview(scrollIndicator)
        scrollIndicator.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalTo(collectionView.snp.bottom).offset(18)
            make.height.equalTo(8)
        }
        
        addSubview(button)
        button.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(40)
            make.top.equalTo(scrollIndicator.snp.bottom).offset(18)
            make.bottom.equalToSuperview().offset(-40)
        }
    }
}

extension TopForecastersView: SkeletonCollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return forecasters.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellID, for: indexPath) as! TopForecasterCell
        cell.setupCell(forecaster: forecasters[indexPath.row])
        return cell
    }
    
    func collectionSkeletonView(_ skeletonView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 15
    }
    
    func collectionSkeletonView(_ skeletonView: UICollectionView, cellIdentifierForItemAt indexPath: IndexPath) -> ReusableCellIdentifier {
        return cellID
    }
}

extension TopForecastersView: UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let forecaster = forecasters[indexPath.row]
        delegate?.forecasterTapped(forecaster)
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        scrollIndicator.reload()
    }
}
