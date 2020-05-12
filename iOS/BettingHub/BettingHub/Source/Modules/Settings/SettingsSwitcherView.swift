//
//  SettingsSwitcherView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 04.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SettingsSwitcherView: UIControl {
    
    let label: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoRegular(size: 16)
        return view
    }()
    
    let switchView = SwitchView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.leading.top.bottom.equalToSuperview()
        }
        
        addSubview(switchView)
        switchView.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview()
            make.leading.equalTo(label.snp.trailing)
            make.width.equalTo(39)
            make.centerY.equalToSuperview()
            make.height.equalTo(19)
        }
        
    }
}

class SwitchView: UIControl {
    
    var isOn: Bool = false {
        didSet {
            makeForState(animated: true)
        }
    }
    
    private var isAnimatig: Bool = false
    
    private static let unselectedColor = UIColor.hex(0xA8ABAF)
    private static let selectedColor = UIColor.hex(0x0F971D)
    
    private let backView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.hex(0xF4F4F4)
        view.layer.shadowOpacity = 0.25
        view.layer.shadowOffset = .init(width: 0, height: 1.5)
        view.layer.shadowRadius = 0.5
        return view
    }()
    
    private let circleView: UIView = {
        let view = UIView()
        view.backgroundColor = SwitchView.unselectedColor
        view.layer.shadowOpacity = 0.25
        view.layer.shadowOffset = .init(width: 0, height: 1.5)
        view.layer.shadowRadius = 0.5
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
        
        let gesture = UITapGestureRecognizer(target: self, action: #selector(toggle))
        addGestureRecognizer(gesture)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc private func toggle() {
        if !isAnimatig {
            isOn.toggle()
            print(isOn)
        }
    }
    
    private func makeLayout() {
        addSubview(backView)
        backView.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.top.equalToSuperview().offset(2).priority(.high)
            make.bottom.equalToSuperview().offset(-2)
        }
        
        addSubview(circleView)
        makeForState(animated: false)
    }
    
    private func makeForState(animated: Bool) {
        circleView.snp.remakeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.height.width.equalTo(snp.height)
            (isOn ? make.trailing : make.leading).equalToSuperview()
        }
        
        isAnimatig = true
        UIView.animate(withDuration: animated ? 0.2 : 0, animations: {
            self.layoutIfNeeded()
            self.circleView.backgroundColor = self.isOn
                                              ? SwitchView.selectedColor
                                              : SwitchView.unselectedColor
        }) { (completed) in
            if completed {
                self.isAnimatig = false
            }
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        backView.layer.cornerRadius = backView.frame.height / 2
        circleView.layer.cornerRadius = circleView.frame.height / 2
    }
}
