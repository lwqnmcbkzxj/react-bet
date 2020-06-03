//
//  ProfileSegmenterView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 01.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class ProfileSegmenterView: UIControl {
    
    var selectedIndex: Int? {
        didSet {
            updateState()
            sendActions(for: .valueChanged)
        }
    }
    
    private(set) var items: [String] = [] {
        didSet { populate() }
    }
    
    private let unselectedFont = UIFont.robotoRegular(size: 15)
    private let selectedFont = UIFont.robotoMedium(size: 15)
    
    private let stack: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.distribution = .fillEqually
        view.isUserInteractionEnabled = false
        return view
    }()
    
    private let slider: UIView = {
        let view = UIView()
        view.backgroundColor = .mainOrange
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        addSubview(stack)
        stack.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        addSubview(slider)
        
        let gesture = UITapGestureRecognizer(target: self, action: #selector(tapped(_:)))
        addGestureRecognizer(gesture)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        updateState()
    }
    
    
    func setItems(_ items: [String]) {
        self.items = items
    }
    
    private func populate() {
        stack.arrangedSubviews.forEach { (view) in
            view.removeFromSuperview()
        }
        
        items.forEach { (str) in
            let label = createLabel(text: str)
            stack.addArrangedSubview(label)
        }
    }
    
    private func createLabel(text: String) -> UILabel {
        let label = UILabel()
        label.text = text
        label.font = unselectedFont
        label.isUserInteractionEnabled = false
        label.textAlignment = .center
        return label
    }
    
    
    @objc private func tapped(_ recognizer: UITapGestureRecognizer) {
        let xCoordinate = recognizer.location(in: self).x
        guard items.count != 0 else { return }
        let itemWidth = bounds.width / CGFloat(items.count)
        let selectedItem = Int((xCoordinate / itemWidth))
        
        selectedIndex = selectedItem
    }
    
    private func updateState() {
        guard
            items.count != 0,
            let index = selectedIndex
        else {
            selectItem(nil)
            moveSlider(to: 0, width: 0)
            return
        }
        
        let itemWidth = bounds.width / CGFloat(items.count)
        let x = itemWidth * CGFloat(index)
        
        selectItem(index)
        moveSlider(to: x, width: itemWidth)
    }
    
    private func selectItem(_ index: Int?) {
        let index = index ?? -1
        stack.arrangedSubviews.enumerated().forEach { (element) in
            let (offset, view) = element
            let label = view as! UILabel
            label.font = offset == index ? selectedFont : unselectedFont
        }
    }
    
    private func moveSlider(to x: CGFloat, width: CGFloat) {
        let height: CGFloat = 4
        let y = bounds.height - height
        let newFrame = CGRect(x: x, y: y, width: width, height: height)
        
        self.slider.frame = newFrame
    }
}
