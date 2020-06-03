//
//  ArrowsStepperView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 19.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ArrowsStepperView: UIControl {
    
    private let arrow = UIImage(named: "stepperArrow")!.withRenderingMode(.alwaysOriginal)
    private let positiveArrow = UIImage(named: "stepperArrowPositive")!.withRenderingMode(.alwaysOriginal)
    private let negativeArrow = UIImage(named: "stepperArrowNegative")!.withRenderingMode(.alwaysOriginal)
    
    private(set) var stepperState: RatingStatus = .none {
        didSet {
            setupForState()
        }
    }
    
    private lazy var downArrowButton: UIButton = {
        let view = UIButton(type: .system)
        view.setImage(arrow, for: .normal)
        return view
    }()
    
    private lazy var upArrowButton: UIButton = {
        let view = UIButton(type: .system)
        view.setImage(arrow, for: .normal)
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
        
//        TODO: Uncomment
        downArrowButton.addTarget(self, action: #selector(downTapped), for: .touchUpInside)
        upArrowButton.addTarget(self, action: #selector(upTapped), for: .touchUpInside)
    }
    
    func setNumber(_ number: Int, state: RatingStatus) {
        label.setNumber(to: Double(number))
        self.stepperState = state
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc private func upTapped() {
        if stepperState == .like {
            stepperState = .none
            return
        }
        stepperState = .like
        sendActions(for: .valueChanged)
    }
    
    @objc private func downTapped() {
        if stepperState == .dislike {
            stepperState = .none
            return
        }
        stepperState = .dislike
        sendActions(for: .valueChanged)
    }
    
    private func setupForState() {
        let upImage = stepperState == .like ? positiveArrow : arrow
        let downImage = stepperState == .dislike ? negativeArrow : arrow
        
        upArrowButton.setImage(upImage, for: .normal)
        downArrowButton.setImage(downImage, for: .normal)
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
