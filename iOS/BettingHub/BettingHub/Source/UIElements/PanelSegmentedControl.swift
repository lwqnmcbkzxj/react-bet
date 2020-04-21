//
//  PanelSegmetedControl.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class PanelSegmenterControl: UIControl {
    
    var selectedSegment: Int? = nil {
        didSet { selectItem(index: selectedSegment) }
    }
    
    let items: [String]
    
    private let panel = UIItems.grayPanel
    
    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.distribution = .equalSpacing
        return view
    }()
    
    init(items: [String]) {
        self.items = items
        super.init(frame: .zero)
        makeLayout()
        populate()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        addSubview(panel)
        panel.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        addSubview(stackView)
        stackView.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(8).priority(.high)
            make.trailing.equalToSuperview().offset(-8).priority(.high)
        }
    }
    
    private func populate() {
        items.enumerated().map { (element) -> UILabel in
            let (offset, text) = element
            let label = Item(index: offset, control: self)
            label.text = text
            return label
        }.forEach { stackView.addArrangedSubview($0) }
    }
    
    private func selectItem(index: Int?) {
        for view in stackView.arrangedSubviews {
            let item = view as! Item
            item.isSelected = false
        }
        
        if let i = index {
            let itemSelected = stackView.arrangedSubviews[i] as! Item
            itemSelected.isSelected = true
        }
        
        sendActions(for: .valueChanged)
    }
}

private extension PanelSegmenterControl {
    
    class Item: UILabel {
        
        let index: Int
        
        var isSelected: Bool = false {
            didSet {
                font = isSelected ? .robotoMedium(size: 16) : .robotoRegular(size: 16)
            }
        }
        
        weak private var control: PanelSegmenterControl?
        
        init(index: Int, control: PanelSegmenterControl) {
            self.control = control
            self.index = index
            super.init(frame: .zero)
            textColor = .titleBlack
            font = .robotoRegular(size: 16)
            textAlignment = .center
            isUserInteractionEnabled = true
            
            let gesture = UITapGestureRecognizer(target: self, action: #selector(tapped))
            addGestureRecognizer(gesture)
        }
        
        required init?(coder: NSCoder) {
            fatalError("init(coder:) has not been implemented")
        }
        
        @objc private func tapped() {
            control?.selectedSegment = index
        }
    }
}

#if canImport(SwiftUI) && DEBUG
import SwiftUI
@available(iOS 13, *)
struct PanelSegmenterControlPreview: PreviewProvider {
    static var previews: some View {
        UIViewPreview {
            PanelSegmenterControl(items: ["Title1", "Second title", "Title3"])
        }.frame(maxWidth: 300, maxHeight: 33)
    }
}
#endif
