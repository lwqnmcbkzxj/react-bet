//
//  ErrorView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 15.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import SnapKit

class ErrorView: UIView {
    
    fileprivate(set) var showingError: Bool = false
    
    private let label: UILabel = {
        let label = UILabel()
        label.textAlignment = .center
        label.numberOfLines = 1
        label.textColor = .errorTextColor
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = UIColor.darkRed.withAlphaComponent(0.2)
        addSubview(label)
        label.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-3)
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func show(text: String) {
        guard let superview = superview else { return }
        
        label.text = text
        self.snp.remakeConstraints { (make) in
            make.leading.trailing.top.equalToSuperview()
            make.bottom.equalTo(superview.snp.topMargin).offset(21)
        }
    }
    
    func hide() {
        guard let superview = superview else { return }
        self.snp.remakeConstraints { (make) in
            make.leading.top.trailing.equalToSuperview()
            make.bottom.equalTo(superview.snp.top)
        }
    }
}

extension UIView {
    func enableErrorShowing() {
        let errorView = ErrorView()
        addSubview(errorView)
        errorView.snp.makeConstraints { (make) in
            make.leading.trailing.top.equalToSuperview()
            make.bottom.equalTo(snp.top)
        }
    }
    
    func showError(text: String) {
        for view in subviews {
            if let errView = view as? ErrorView {
                show(errorView: errView, text: text)
                return
            }
        }
    }
    
    private func show(errorView: ErrorView, text: String) {
        if errorView.showingError { return }
        errorView.showingError = true
        UIView.animate(withDuration: 0.3, animations: {
            errorView.show(text: text)
            self.layoutIfNeeded()
        }) { (_) in
            UIView.animate(withDuration: 0.3, delay: 2, animations: {
                errorView.hide()
                self.layoutIfNeeded()
            }) { (_) in
                errorView.showingError = false
            }
        }
    }
}
