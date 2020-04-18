//
//  OrangeScrollIndicator.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UIScrollView {
    enum ScrollDirection {
        case vertical, horizontal
    }
}

class OrangeScrollIndicator: UIView {
    
    weak private(set) var scrollView: UIScrollView?
    private var direction: UIScrollView.ScrollDirection = .horizontal
    
    private let indicator: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 4
        view.backgroundColor = .mainOrange
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        reload()
    }
    
    func attach(to scrollView: UIScrollView, direction: UIScrollView.ScrollDirection) {
        self.scrollView = scrollView
        self.direction = direction
        scrollView.delegate = self
    }
    
    func deattachScrollView() {
        scrollView = nil
    }
    
    func reload() {
        guard let scrollView = self.scrollView else { return }
        useScrollViewData(scrollView: scrollView)
    }
    
    /// Sets length and position of scrollIndicator
    /// - Parameter length: Less than 1. Relative to full length
    /// - Parameter offset: Less than 1. Relative to full length
    private func setIndicator(length: CGFloat, offset: CGFloat) {
        if direction == .horizontal {
            indicator.frame = .init(x: offset * bounds.width,
                                    y: 0,
                                    width: length * bounds.width,
                                    height: bounds.height)
        } else {
            indicator.frame = .init(x: 0,
                                    y: offset * bounds.height,
                                    width: bounds.width,
                                    height: length * bounds.height)
        }
    }
    
    private func configure() {
        layer.cornerRadius = 4
        layer.masksToBounds = true
        backgroundColor = .lightGray
        addSubview(indicator)
    }
}

extension OrangeScrollIndicator: UIScrollViewDelegate {
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        useScrollViewData(scrollView: scrollView)
    }
    
    private func useScrollViewData(scrollView: UIScrollView) {
        let offset = direction == .horizontal
            ? scrollView.contentOffset.x
            : scrollView.contentOffset.y
        
        let contentLength = direction == .horizontal
            ? scrollView.contentSize.width
            : scrollView.contentSize.height
        
        let visibleLength = direction == .horizontal
            ? scrollView.frame.size.width
            : scrollView.frame.size.height
        
        if contentLength == 0 { return }
        setIndicator(length: visibleLength / contentLength,
                     offset: offset / contentLength)
    }
}
