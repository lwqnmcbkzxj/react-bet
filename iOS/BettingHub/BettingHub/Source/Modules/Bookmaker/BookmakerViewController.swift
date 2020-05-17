//
//  BookmakerViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 08.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BookmakerViewController: UIViewController {
    
    private lazy var commentsTable: CommentsTableView = {
        let vm = CommentsTableViewModel()
        let view = CommentsTableView(viewModel: vm, header: bookmakerHeader)
        return view
    }()
    
    private lazy var bookmakerHeader = BookmakerView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(commentsTable, insets: .init(top: 27, left: 15, bottom: 0, right: 15))
    }
    
    func configure(with bookmaker: Bookmaker) {
        bookmakerHeader.configure(bookmaker: bookmaker)
    }
}

