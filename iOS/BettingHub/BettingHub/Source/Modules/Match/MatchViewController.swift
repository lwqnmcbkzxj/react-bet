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
    
    private lazy var fullMatchViewModel = FullMatchViewModel()
    
    private lazy var matchBetsViewModel = MatchBetsViewModel(tableView: tableView)
    
    private lazy var commentsViewModel = CommentsViewModel(tableView: tableView)
    
    private lazy var tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.separatorColor = .clear
        view.clipsToBounds = false
        view.backgroundColor = .white
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(tableView, insets: .init(top: 23, left: 15, bottom: 0, right: 15))
        
        tableView.dataSource = self
        tableView.delegate = self
        
        fullMatchViewModel.timerCallback = { (timerStr) in
            self.matchView.timer(to: timerStr)
        }
        
        setHeader()
    }
    
    private func setHeader() {
        let size = matchView.systemLayoutSizeFitting(UIView.layoutFittingCompressedSize)
        matchView.frame = .init(x: 0, y: 0,
                                width: tableView.frame.width,
                                height: size.height)
        tableView.tableHeaderView = matchView
    }
    
    func configure(with match: Match) {
        matchView.configure(match: match)
        fullMatchViewModel.configure(match: match)
        matchBetsViewModel.loadData(for: match.id) { [weak self] in
            guard
                let this = self,
                let match = this.matchBetsViewModel.match
            else { return }
            this.matchView.configure(match: match)
            this.tableView.reloadData()
        }
    }
    
    func sectionType(for sec: Int) -> Section {
        let intended: [Section] = [.userBet, .comment]
//        let population: [Int] = [matchBetsViewModel.numberOfRows(), commentsViewModel.numberOfCells()]
        let population: [Int] = [matchBetsViewModel.numberOfCells(), 0] //TODO: tempUI
        return intended
            .enumerated()
            .filter { population[$0.offset] != 0}
            .map { $0.element } [sec]
    }
}

extension MatchViewController {
    
    enum Section {
        case userBet
        case comment
    }
}

extension MatchViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
//        return [matchBetsViewModel.numberOfRows(),
//                commentsViewModel.numberOfCells()].filter {$0 != 0}.count
        return [matchBetsViewModel.numberOfCells(),
                0].filter {$0 != 0}.count //TODO: tempUI
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch sectionType(for: section) {
        case .userBet: return matchBetsViewModel.numberOfCells()
        case .comment: return commentsViewModel.numberOfCells()
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch sectionType(for: indexPath.section) {
        case .userBet: return matchBetsViewModel.cell(for: indexPath.row)
        case .comment: return commentsViewModel.cell(for: indexPath.row)
        }
    }
}

extension MatchViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        switch sectionType(for: section) {
        case .userBet: return matchBetsViewModel.header()
        case .comment: return commentsViewModel.header()
        }
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        switch sectionType(for: section) {
        case .userBet: return matchBetsViewModel.headerHeight()
        case .comment: return commentsViewModel.headerHeight()
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
}
