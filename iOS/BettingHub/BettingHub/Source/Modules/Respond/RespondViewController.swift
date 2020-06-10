//
//  RespondViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 10.06.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class RespondViewController: UIViewController {
    
    private let respondView = RespondView()
    var presenter : IRespondPresenter!
    
    override func loadView() {
        super.loadView()
        addBackView(text: nil)
        view.backgroundColor = .white
        setView(respondView)
        
        backView?.setRightItems([respondView.sendButton])
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        respondView.configure(with: presenter.comment)
        respondView.sendButton.addTarget(self, action: #selector(sendTapped), for: .touchUpInside)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        respondView.commentInput.becomeFirstResponder()
    }
    
    @objc private func sendTapped() {
        guard
            let text = respondView.commentInput.text,
            !text.isEmpty
        else { return }
        presenter.addComment(text: text) {
            self.navigationController?.popViewController(animated: true)
        }
    }
}
