//
//  ArrowsStepperView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ArrowsStepperView: UIControl {
    
    private let downArrowButton: UIButton = {
        let view = UIButton(type: .system)
        let image = UIImage(named: "stepperArrow")?.withRenderingMode(.alwaysOriginal)
        view.setImage(image, for: .normal)
        return view
    }()
    
    private let upArrowButton: UIButton = {
        let view = UIButton(type: .system)
        let image = UIImage(named: "stepperArrow")?.withRenderingMode(.alwaysOriginal)
        view.setImage(image, for: .normal)
        view.transform = .init(rotationAngle: CGFloat.pi)
        return view
    }()
    
    private let label: PositivityLabel = {
        let view = PositivityLabel()
        view.textAlignment = .center
        view.showingSign = false
        view.units = .none
        view.rounding = .integer
        view.setNumber(to: 0)
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        makeLayout()
        
        downArrowButton.addTarget(self, action: #selector(downTapped), for: .touchUpInside)
        upArrowButton.addTarget(self, action: #selector(upTapped), for: .touchUpInside)
    }
    
    func setNumber(_ number: Int) {
        label.setNumber(to: Double(number))
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc private func downTapped() {
        label.setNumber(to: label.number - 1)
        sendActions(for: .valueChanged)
    }
    
    @objc private func upTapped() {
        label.setNumber(to: label.number + 1)
        sendActions(for: .valueChanged)
    }
    
    private func makeLayout() {
        addSubview(downArrowButton)
        downArrowButton.snp.makeConstraints { (make) in
            make.leading.top.bottom.equalToSuperview()
            make.width.equalTo(downArrowButton.snp.height)
        }
        
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.leading.equalTo(downArrowButton.snp.trailing).offset(7)
            make.top.bottom.equalToSuperview()
        }
        
        addSubview(upArrowButton)
        upArrowButton.snp.makeConstraints { (make) in
            make.leading.equalTo(label.snp.trailing).offset(7)
            make.top.bottom.trailing.equalToSuperview()
        }
    }
}
