//
//  LastForecastsView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class LastForecastsView: UIView {
    
    private let minimumCircleWidth: CGFloat = 10
    
    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.spacing = 2.5
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        
        addSubview(stackView)
        stackView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
//        stackView.arrangedSubviews.forEach { (circle) in
//            if !circle.isHidden,
//                circle.frame.width < minimumCircleWidth {
//                circle.isHidden = true
//                layoutSubviews()
//                return
//            } else if circle.isHidden,
//                circle.frame.width >= minimumCircleWidth {
//                circle.isHidden = false
//            }
//        }
//        if stackView.frame.width < stackView.intrinsicContentSize.width {
//            
//        }
    }
    
    func populate(with values: [Bool]) {
        for view in stackView.arrangedSubviews {
            stackView.removeArrangedSubview(view)
        }
        
        values.map {generateCircle(from: $0)}.forEach { (circle) in
            stackView.addArrangedSubview(circle)
        }
    }
    
    private func generateCircle(from value: Bool) -> UIView {
        let circle = UIImageView()
        circle.contentMode = .scaleAspectFit
        circle.snp.makeConstraints { (make) in
            make.width.equalTo(10)
        }
        circle.image = UIImage(named: value ? "rightCircle" : "falseCircle")!
        return circle
    }
}
