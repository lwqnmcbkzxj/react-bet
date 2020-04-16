//
//  NavigationBackView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class NavigationBackView: UIView {
    
    private let imageView: UIImageView = {
        let image = UIImage(named: "arrowBack")
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFill
        return imageView
    }()
    
    private let label: UILabel = {
        let label = UILabel()
        label.font = .robotoMedium(size: 17)
        label.textColor = .titleBlack
        return label
    }()
    
    init(text: String?) {
        super.init(frame: .zero)
        
        makeLayout()
        setupUI(text: text)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.width.height.equalTo(13)
            make.leading.equalToSuperview().offset(16)
            make.bottom.equalToSuperview().offset(-11)
        }
        
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.leading.equalTo(imageView.snp.trailing).offset(11)
            make.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-7)
        }
    }
    
    private func setupUI(text: String?) {
        label.text = text ?? Text.back
        backgroundColor = .white
        
        layer.shadowOpacity = 0.5
        layer.shadowRadius = 5
    }
}
