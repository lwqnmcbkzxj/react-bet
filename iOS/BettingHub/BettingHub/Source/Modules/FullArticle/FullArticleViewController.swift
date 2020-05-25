//
//  FullArticleViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullArticleViewController: UIViewController {
    
    var router: IFullArticleRouter!
    var vm: FullArticleViewModel!
    
    private let tableView: UITableView = {
        let view = UITableView(frame: .zero, style: .grouped)
        view.backgroundColor = .white
        view.separatorColor = .clear
        view.scrollIndicatorInsets = .init(top: 0, left: 0, bottom: 0, right: -15)
        view.clipsToBounds = false
        return view
    }()
    
    
    
    private lazy var sections: [TableSectionProvider]! = vm.createProviders(with: tableView)
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(tableView, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
        tableView.delegate = self
        tableView.dataSource = self
    }
}

extension FullArticleViewController: UITableViewDataSource {
    
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

extension FullArticleViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return sections[section].header()
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return sections[section].headerHeight()
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return sections[indexPath.section].cellHeight()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section ==  1 { //article
            router.show(article: .stub())
        }
    }
}
