//
//  Spinner.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 30.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol ISpinner {
    func show()
    func remove()
}

class Spinner: ISpinner {
    
    private weak var spinnerView: SpinnerView?
    private weak var viewController: UIViewController?
    
    init(viewController: UIViewController) {
        self.viewController = viewController
    }
    
    func show() {
        let spinner = SpinnerView()
        viewController?.view.addSubview(spinner)
        spinner.frame = viewController?.view.frame ?? .zero
        self.spinnerView = spinner
    }
    
    func remove() {
        spinnerView?.removeFromSuperview()
    }
}

private class SpinnerView: UIView {
    
    private let indicator: UIActivityIndicatorView = {
        let indicator = UIActivityIndicatorView()
        indicator.color = .mainOrange
        indicator.transform = .init(scaleX: 2.5, y: 2.5)
        indicator.startAnimating()
        return indicator
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        let effect = UIBlurEffect(style: .light)
        let blurView = UIVisualEffectView(effect: effect)
        
        addSubview(blurView)
        blurView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
        
        addSubview(indicator)
        indicator.snp.makeConstraints { (make) in
            make.centerY.centerX.equalToSuperview()
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
