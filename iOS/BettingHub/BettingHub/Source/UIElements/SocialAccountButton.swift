//
//  SocialAccountButton.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 04.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SnapKit

class SocialAccountView: UIView {
    
    let network: SocialNetwork
    
    var attached: Bool = false {
        didSet { makeForState() }
    }
    
    var attachTapped: (()->Void)?
    var deattachTapped: (()->Void)?
    
    private let stack: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.spacing = 10
        return view
    }()
    
    private lazy var imageView: UIView = {
        let names: [SocialNetwork: String] = [
            .google : "google",
            .facebook: "facebook",
            .vk: "vk"
        ]
        let image = UIImage(named: names[network]!)
        let view = UIImageView(image: image)
        
        let container = UIView()
        container.backgroundColor = .clear
        container.addSubview(view)
        view.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.centerY.equalToSuperview()
            make.width.height.equalTo(26)
        }
        
        return container
    }()
    
    private lazy var titleLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        view.textAlignment = .center
        
        let titles: [SocialNetwork: String] = [
            .google : "Google",
            .facebook: "Facebook",
            .vk: "Вконтакте"
        ]
        
        view.text = titles[network]!
        
        return view
    }()
    
    private let separatorView: UIView = {
        let view = UIView()
        view.backgroundColor = .lineGray
        view.isHidden = true
        view.snp.makeConstraints { (make) in
            make.width.equalTo(1)
        }
        return view
    }()
    
    private let crossImageView: UIView = {
        let image = UIImage(named: "crossIcon")!
        let view = UIImageView(image: image)
        
        
        let container = UIView()
        container.backgroundColor = .clear
        container.isHidden = true
        container.addSubview(view)
        view.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.centerY.equalToSuperview()
            make.width.height.equalTo(14)
        }
        
        return container
    }()
    
    init(network: SocialNetwork) {
        self.network = network
        
        super.init(frame: .zero)
        
        layer.borderWidth = 1
        layer.borderColor = UIColor.lineGray.cgColor
        layer.cornerRadius = 5
        makeLayout()
        
        let attachGesture = UITapGestureRecognizer(target: self, action: #selector(viewTapped))
        addGestureRecognizer(attachGesture)
        
        let deattachGesture = UITapGestureRecognizer(target: self, action: #selector(crossTapped))
        crossImageView.addGestureRecognizer(deattachGesture)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    @objc private func viewTapped() {
        attachTapped?()
    }
    
    @objc private func crossTapped() {
        deattachTapped?()
    }
    
    private func makeLayout() {
        addSubview(stack)
        stack.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(9)
            make.trailing.equalToSuperview().offset(-9)
        }
        
        stack.addArrangedSubview(imageView)
        stack.addArrangedSubview(titleLabel)
        stack.addArrangedSubview(separatorView)
        stack.addArrangedSubview(crossImageView)
    }
    
    private func makeForState() {
        separatorView.isHidden = !attached
        crossImageView.isHidden = !attached
    }
}
