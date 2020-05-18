//
//  MatchViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MatchViewController: UIViewController {
    
    private lazy var matchView = MatchView()
    
    private lazy var commentsTable: CommentsTableView = {
        let vm = CommentsTableViewModel()
        let view = CommentsTableView(viewModel: vm, header: matchView)
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(commentsTable, insets: .init(top: 23, left: 15, bottom: 0, right: 15))
    }
    
    func configure(with match: Match) {
        matchView.configure(match: match)
    }
}
