//
//  SocialButton.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SocialButton: UIButton {
    
    private(set) var network: SocialNetwork
    
    init(network: SocialNetwork) {
        self.network = network
        super.init(frame: .zero)
        
        let names: [SocialNetwork: String] = [
            .google : "google",
            .facebook: "facebook",
            .vk: "vk"
        ]
        
        let image = UIImage(named: names[network]!)
        setImage(image, for: .normal)
        
        backgroundColor = .white
        layer.cornerRadius = 6
        layer.borderWidth = 1
        layer.borderColor = UIColor.lineGray.cgColor
        setTitleColor(.titleBlack, for: .normal)
        titleLabel?.font = .robotoRegular(size: 16)
        titleEdgeInsets = .init(top: 0, left: 10, bottom: 0, right: 0)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func contentRect(forBounds bounds: CGRect) -> CGRect {
        return bounds
    }
}
