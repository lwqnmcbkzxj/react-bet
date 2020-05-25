//
//  FullForecastViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class FullForecastViewController: UIViewController {
    
    var router: IFullForecastRouter!
    
    private var forecast: Forecast?
    
    private lazy var commentsTable: CommentsTableView = {
        let vm = CommentsTableViewModel()
        let view = CommentsTableView(viewModel: vm, header: fullForecastHeader)
        return view
    }()
    
    private lazy var fullForecastHeader = FullForecastHeader()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(commentsTable, insets: .init(top: 0, left: 15, bottom: 0, right: 15))
        
        let gesture = UITapGestureRecognizer(target: self, action: #selector(userTapped))
        fullForecastHeader.userPanel.addGestureRecognizer(gesture)
    }
    
    func configure(with forecast: Forecast) {
        self.forecast = forecast
        fullForecastHeader.configure(with: forecast)
    }
    
    @objc private func userTapped() {
        guard let forecaster = forecast?.user else { return }
        router.showForecaster(forecaster)
    }
}
