//
//  MatchViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 18.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MatchViewController: UIViewController {
    
    var matchView: MatchView!
    
    private(set) var sections: [TableSectionProvider] = []
    
    private(set) lazy var tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.separatorColor = .clear
        view.clipsToBounds = false
        view.backgroundColor = .white
        view.dataSource = self
        view.delegate = self
        return view
    }()
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(tableView, insets: .init(top: 23, left: 15, bottom: 0, right: 15))
        setHeader()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        sections.enumerated().forEach { $0.element.reload() }
    }
    
    func setSections(_ sections: [TableSectionProvider]) {
        self.sections = sections
    }
    
    private func setHeader() {
        let size = matchView.systemLayoutSizeFitting(UIView.layoutFittingCompressedSize)
        matchView.frame = .init(x: 0, y: 0,
                                width: tableView.frame.width,
                                height: size.height)
        tableView.tableHeaderView = matchView
    }
}

extension MatchViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        sections.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sections[section].numberOfCells()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return sections[indexPath.section].cell(for: indexPath.row)
    }
}

extension MatchViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return sections[section].header()
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return sections[section].headerHeight()
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return sections[indexPath.section].cellHeight()
    }
}
