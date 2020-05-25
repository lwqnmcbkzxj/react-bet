//
//  PolicyViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import AloeStackView

class PolicyViewController: UIViewController {
    
    var presenter: IPolicyPresenter!
    
    private let aloeStack: AloeStackView = {
        let view = AloeStackView()
        view.axis = .vertical
        view.clipsToBounds = false
        view.hidesSeparatorsByDefault = true
        return view
    }()
    
    private let politicsLabel: UILabel = {
        let label = UILabel()
        label.font = .robotoRegular(size: 13)
        label.numberOfLines = 0
        label.textColor = .titleBlack
        label.text = ""
        return label
    }()
    
    override func loadView() {
        super.loadView()
        addBackView(text: nil)
        
        view.backgroundColor = .white
        
        setView(aloeStack)
        aloeStack.addRow(politicsLabel)
        aloeStack.setInset(forRow: aloeStack.firstRow!, inset: .init(top: 20, left: 16, bottom: 20, right: 16))
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        presenter.loadPolicy { [weak self] (policyText) in
            self?.politicsLabel.text = policyText
        }
    }
}
