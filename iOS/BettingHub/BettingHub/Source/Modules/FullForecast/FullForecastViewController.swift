//
//  FullForecastViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullForecastViewController: UIViewController {
    
    var fullForecastHeader: FullForecastHeader!
    var router: IFullForecastRouter!
    
    private lazy var commentsTable: CommentsTableView = {
        let vm = CommentsTableViewModel()
        let view = CommentsTableView(viewModel: vm, header: fullForecastHeader)
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(commentsTable, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
    }
}
