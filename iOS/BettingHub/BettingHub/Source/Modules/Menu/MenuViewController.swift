//
//  MenuViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MenuViewController: UIViewController {
    
    private lazy var menuView = MenuView()
    
    private let coordinator: AppCoordinator
    
    init(coordinator: AppCoordinator) {
        self.coordinator = coordinator
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setView(menuView)
        view.backgroundColor = .white
        
        setupActions()
    }
    
    private func setupActions() {
        menuView.matchesPanel.gesture.addTarget(self, action: #selector(routeToTopMatches))
        menuView.bookMakersPanel.gesture.addTarget(self, action: #selector(routeToTopBookmakers))
        menuView.forecastersPanel.gesture.addTarget(self, action: #selector(routeToTopForecasters))
        menuView.newsPanel.gesture.addTarget(self, action: #selector(routeToNews))
        menuView.articlesPanel.gesture.addTarget(self, action: #selector(routeToArticles))
    }
    
    @objc private func routeToTopMatches() {
        let vc = coordinator.matchesScreen()
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc private func routeToTopBookmakers() {
        let vc = coordinator.bookmakersScreen()
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc private func routeToTopForecasters() {
        
    }
    
    @objc private func routeToNews() {
        
    }
    
    @objc private func routeToArticles() {
        
    }
}
