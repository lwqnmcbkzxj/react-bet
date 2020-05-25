//
//  MenuView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 27.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class MenuView: UIView {
    
    let matchesPanel = MenuPanel(text: Text.menuMatches, image: UIImage(named: "fieldIcon")!)
    let bookMakersPanel = MenuPanel(text: Text.menuBookmakers, image: UIImage(named: "awardIcon")!)
    let forecastersPanel = MenuPanel(text: Text.menuForecasters, image: UIImage(named: "awardIcon")!)
//    let newsPanel = MenuPanel(text: Text.menuNews, image: UIImage(named: "articleIcon")!)
    let articlesPanel = MenuPanel(text: Text.menuArticles, image: UIImage(named: "articleIcon")!)
    let confidentialPoliticsPanel = MenuPanel(text: Text.confidentialPolitics,
                                              image: UIImage(named: "articleIcon")!)
    let feedbackPanel = MenuPanel(text: Text.leaveFeedback,
                                  image: UIImage(named: "articleIcon")!)
    
    init() {
        super.init(frame: .zero)
        backgroundColor = .lightGray
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        let mainStack = UIStackView()
        mainStack.spacing = 14
        mainStack.distribution = .fillEqually
        mainStack.axis = .vertical
        mainStack.addArrangedSubview(matchesPanel)
        
        let hStack1 = UIStackView()
        hStack1.spacing = 17
        hStack1.axis = .horizontal
        hStack1.distribution = .fillEqually
        hStack1.addArrangedSubview(bookMakersPanel)
        hStack1.addArrangedSubview(forecastersPanel)
        mainStack.addArrangedSubview(hStack1)
        
        let hStack2 = UIStackView()
        hStack2.axis = .horizontal
        hStack2.spacing = 17
        hStack2.distribution = .fillEqually
        hStack2.addArrangedSubview(confidentialPoliticsPanel)
        hStack2.addArrangedSubview(articlesPanel)
        mainStack.addArrangedSubview(hStack2)
        
//        mainStack.addArrangedSubview(articlesPanel)
        
        addSubview(mainStack)
        mainStack.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(19)
            make.trailing.equalToSuperview().offset(-19)
            make.bottom.equalToSuperview().offset(-40).priority(.medium)
            make.bottom.equalToSuperview().offset(-20)
//            make.height.equalTo(490).priority(.high)
            make.height.equalTo(364).priority(.high)
            make.top.greaterThanOrEqualToSuperview().offset(10)
        }
    }
}
