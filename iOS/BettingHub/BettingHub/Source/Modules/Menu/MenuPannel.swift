//
//  MenuPannel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MenuPanel: UIView {
    
    private let titleLabel: UILabel = {
        let label = UILabel()
        label.textColor = .titleBlack
        label.font = .robotoMedium(size: 18)
        label.textAlignment = .left
        label.numberOfLines = 2
        return label
    }()
    
    private let imageView: UIImageView = {
        let view = UIImageView()
        view.contentMode = .scaleAspectFit
        return view
    }()
    
    let gesture = UITapGestureRecognizer()
    
    init(text: String, image: UIImage) {
        super.init(frame: .zero)
        
        backgroundColor = .white
        layer.cornerRadius = 7
        
        addSubview(imageView)
        imageView.snp.contentHuggingHorizontalPriority = 1000
        imageView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(14)
            make.top.equalToSuperview().offset(12)
            make.height.equalTo(29)
        }
        
        addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(14)
            make.trailing.equalToSuperview().offset(-14)
            make.bottom.equalToSuperview().offset(-10)
        }
        
        addGestureRecognizer(gesture)
        
        titleLabel.text = text
        imageView.image = image
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
