//
//  LabeledIcon.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class LabeledIconView: UIView {

    private let iconImageView: UIImageView = {
        let view = UIImageView()
        view.contentMode = .scaleAspectFit
        view.isUserInteractionEnabled = false
        return view
    }()
    
    private let iconLabel: UILabel = {
        let view = UILabel()
        view.font = .robotoRegular(size: 15)
        view.textColor = .titleBlack
        view.isUserInteractionEnabled = false
        return view
    }()
    
    private var gesture: UITapGestureRecognizer?
    
    init() {
        super.init(frame: .zero)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setImage(_ image: UIImage) {
        iconImageView.image = image
    }
    
    func setText(_ text: String) {
        iconLabel.text = text
    }
    
    func setTapAction(target: Any, action: Selector) {
        if let gesture = self.gesture {
            removeGestureRecognizer(gesture)
        }
        self.gesture = UITapGestureRecognizer(target: target, action: action)
        addGestureRecognizer(self.gesture!)
    }
    
    private func makeLayout() {
        addSubview(iconImageView)
        iconImageView.snp.makeConstraints { (make) in
            make.leading.top.bottom.equalToSuperview()
            make.width.equalTo(iconImageView.snp.height)
        }
        
        addSubview(iconLabel)
        iconLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(iconImageView.snp.trailing).offset(6)
            make.top.bottom.trailing.equalToSuperview()
        }
    }
}
