//
//  NavigationBackView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class NavigationBackView: UIView {
    
    private let backContainer: UIView = {
        let view = UIView()
        view.backgroundColor = .clear
        return view
    }()
    
    private let imageView: UIImageView = {
        let image = UIImage(named: "arrowBack")
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFill
        imageView.isUserInteractionEnabled = false
        return imageView
    }()
    
    private let label: UILabel = {
        let label = UILabel()
        label.font = .robotoMedium(size: 17)
        label.textColor = .titleBlack
        label.isUserInteractionEnabled = false
        return label
    }()
    
    private let stack: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.spacing = 16
        return stack
    }()
    
    let backGesture: UITapGestureRecognizer = {
        let gesture = UITapGestureRecognizer()
        return gesture
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
        addSubview(backContainer)
        backContainer.snp.makeConstraints { (make) in
            make.leading.bottom.top.equalToSuperview()
        }
        
        backContainer.addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.width.height.equalTo(13)
            make.leading.equalToSuperview().offset(16)
            make.bottom.equalToSuperview().offset(-11)
        }
        
        backContainer.addSubview(label)
        label.snp.contentCompressionResistanceHorizontalPriority = 1000
        label.snp.makeConstraints { (make) in
            make.leading.equalTo(imageView.snp.trailing).offset(11)
            make.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-7)
        }
        
        addSubview(stack)
        stack.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.trailing.equalToSuperview().offset(-15)
            make.height.equalTo(16)
        }
        
        backContainer.addGestureRecognizer(backGesture)
    }
    
    func setRightItems(_ views: [UIView]) {
        stack.arrangedSubviews.forEach { $0.removeFromSuperview() }
        
        for view in views {
            let container = UIView()
            container.addSubview(view)
            view.snp.makeConstraints { (make) in
                make.edges.equalToSuperview()
            }
            
            container.snp.makeConstraints { (make) in
                make.height.equalTo(container.snp.width)
            }
            
            stack.addArrangedSubview(container)
        }
    }
    
    private func setupUI(text: String?) {
        label.text = text ?? Text.back
        backgroundColor = .white
        
        layer.shadowOpacity = 0.5
        layer.shadowRadius = 5
    }
}
