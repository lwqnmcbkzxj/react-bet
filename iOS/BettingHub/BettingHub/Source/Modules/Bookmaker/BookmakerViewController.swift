//
//  BookmakerViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 08.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BookmakerViewController: UIViewController {
    
    var vm: BookmakerViewModel!
    
    private lazy var commentsTable: CommentsTableView = {
//        let vm = CommentsTableViewModel()
        let view = CommentsTableView(header: bookmakerHeader)
        return view
    }()
    
    private lazy var bookmakerHeader = BookmakerView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(commentsTable, insets: .init(top: 27, left: 15, bottom: 0, right: 15))
        
        bookmakerHeader.webPageButton.addTarget(self, action: #selector(openLink), for: .touchUpInside)
    }
    
    func configure(with bookmaker: Bookmaker) {
        bookmakerHeader.configure(bookmaker: bookmaker)
        
        vm.dataChanged = {
            let fullBookmaker = self.vm.bookmaker
            self.bookmakerHeader.configure(bookmaker: fullBookmaker)
            self.commentsTable.reloadData()
        }
    }
    
    @objc private func openLink() {
        guard
            let url = URL(string: vm.bookmaker.link)
        else { return }
        
        if UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        }
    }
}

