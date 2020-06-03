//
//  SubscribeButton.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SubscribeButton: UIButton {
    
    var subscribed: Bool = false {
        didSet {
            let title = subscribed ? Text.unsubscibe : Text.subscribe
            let image = !subscribed
                        ? UIImage(named: "plusIcon")!.withRenderingMode(.alwaysOriginal)
                        : UIImage(named: "minusIcon")!.withRenderingMode(.alwaysOriginal)
            setTitle(title, for: .normal)
            setImage(image, for: .normal)
        }
    }
    
    override var buttonType: UIButton.ButtonType {
        return .system
    }
    
    init() {
        super.init(frame: .zero)
        backgroundColor = .white
        let image = UIImage(named: "plusIcon")!.withRenderingMode(.alwaysOriginal)
        setImage(image, for: .normal)
        setTitle(Text.subscribe, for: .normal)
        layer.borderColor = UIColor.lineGray.cgColor
        layer.borderWidth = 1
        layer.cornerRadius = 5
        titleLabel?.font = .robotoMedium(size: 14)
        titleEdgeInsets = .init(top: 0, left: 2, bottom: 0, right: 0)
        imageEdgeInsets = .init(top: 0, left: 0, bottom: 0, right: 5)
        setTitleColor(.titleBlack, for: .normal)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
