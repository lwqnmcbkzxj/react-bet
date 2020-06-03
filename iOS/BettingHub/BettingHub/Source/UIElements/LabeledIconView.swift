//
//  LabeledIcon.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class LabeledIconWithNumber: LabeledIconView {
    
    func setNumber(_ number: Int) {
        if number == 0 {
            setText("")
        } else {
            setText("\(number)")
        }
    }
}

class LabeledIconView: UIView {
    
    var isSelected: Bool = false {
        didSet {
            iconImageView.image = isSelected ? selectedImage : image
        }
    }
    
    private var image: UIImage?
    private var selectedImage: UIImage?
    
    private var tapAction: (() -> Void)?

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
        self.gesture = UITapGestureRecognizer(target: self, action: #selector(tap))
        addGestureRecognizer(self.gesture!)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setImage(_ image: UIImage, selectedImage: UIImage? = nil) {
        self.image = image
        self.selectedImage = selectedImage
        iconImageView.image = image
    }
    
    func setText(_ text: String) {
        iconLabel.text = text
    }
    
    func setTapAction(action: (() -> Void)?) {
        tapAction = action
    }
    
    @objc private func tap() {
        tapAction?()
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
