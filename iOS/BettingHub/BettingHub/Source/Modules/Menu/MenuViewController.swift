//
//  MenuViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit
import MessageUI

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
        menuView.confidentialPoliticsPanel.gesture.addTarget(self, action: #selector(routeToPolitics))
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
        let vc = coordinator.forecastersScreen()
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc private func routeToNews() {
        let vc = coordinator.newsListScreen()
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc private func routeToArticles() {
        let vc = coordinator.articlesListScreen()
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc private func routeToPolitics() {
        let vc = coordinator.policyScreen()
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc private func routeToFeedback() {
        
    }
    
    private func showMailWindow() {
        guard MFMailComposeViewController.canSendMail() else {
            return
        }
        
        let composer = MFMailComposeViewController()
        composer.mailComposeDelegate = self
        composer.setToRecipients([""])
        composer.setSubject("BettingHub feedback")
        
        present(composer, animated: true, completion: nil)
    }
}

extension MenuViewController: MFMailComposeViewControllerDelegate {
    
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        
    }
}
