//
//  BookmakerView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 16.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class BookmakerView: UITableViewHeaderFooterView {
    
    private let titleView: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 20)
        view.text = Text.bookmakerFirm
        view.textAlignment = .center
        view.numberOfLines = 2
        return view
    }()
    
    private let panel: UIView = {
        let view = UIView()
        view.layer.borderColor = UIColor.lineGray.cgColor
        view.layer.borderWidth = 1
        view.layer.cornerRadius = 7
        view.clipsToBounds = true
        return view 
    }()
    
    private let bookmakerIconView: UIImageView = {
        let view = UIImageView()
        view.layer.cornerRadius = 7
        view.clipsToBounds = true
        return view
    }()
    
    private let webPageButton: UIButton = {
        let view = UIButton()
        view.setTitle(Text.site, for: .normal)
        view.setTitleColor(.titleBlack, for: .normal)
        view.titleLabel?.font = .robotoRegular(size: 14)
        let image = UIImage(named: "greenTick")!.withRenderingMode(.alwaysOriginal)
        view.setImage(image, for: .normal)
        view.layer.cornerRadius = 7
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.titleBlack.cgColor
        view.imageEdgeInsets = .init(top: 0, left: 0, bottom: 0, right: 5)
        return view
    }()
    
    private let stepper: ArrowsStepperView = {
        let view = ArrowsStepperView()
        return view
    }()
    
    private let bigImageView: UIImageView = {
        let view = UIImageView()
        view.image = UIImage(named: "landscapePlaceholder")
        return view
    }()
    
    private let infoStack: InfoStackView = {
        let view = InfoStackView()
        return view
    }()
    
    private let descLabel: UILabel = {
        let label = UILabel()
        label.font = .robotoRegular(size: 17)
        label.textColor = .titleBlack
        label.numberOfLines = 0
        return label
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(bookmaker: Bookmaker) {
        let labels = [
            gradeLabels(text: Text.coeficientWord, grade: 8.35, maxGrade: 10),
            gradeLabels(text: Text.line, grade: 9, maxGrade: 10),
            gradeLabels(text: Text.reliability, grade: 9, maxGrade: 10),
            gradeLabels(text: Text.payingSystems, grade: 8, maxGrade: 10),
            bonusLabels(text: Text.bonus, bonus: bookmaker.bonus)
        ]
        infoStack.populateStack(labels: labels)
        
        descLabel.text = ""
        bookmakerIconView.setServerIcon(url: bookmaker.image)
        stepper.setNumber(10)
        titleView.text = "\(titleView.text ?? "")\n\(bookmaker.title.uppercased())"
    }
    
    private func gradeLabels(text: String, grade: Double, maxGrade: Double) -> (UILabel, UILabel) {
        let title = UILabel()
        title.font = .robotoRegular(size: 14)
        title.text = text
        title.textColor = .titleBlack
        
        let gradeLabel = GradeLabel()
        gradeLabel.setGrade(grade, of: maxGrade)
        return (title, gradeLabel)
    }
    
    private func bonusLabels(text: String, bonus: Double) -> (UILabel, UILabel) {
        let title = UILabel()
        title.font = .robotoRegular(size: 14)
        title.text = text
        title.textColor = .titleBlack
        
        let bonusLabel = UILabel()
        bonusLabel.font = .robotoMedium(size: 14)
        bonusLabel.text = String(Int(bonus))
        bonusLabel.textColor = .mainOrange
        
        return (title, bonusLabel)
    }
    
    private func makeLayout() {
        addSubview(titleView)
        titleView.snp.makeConstraints { (make) in
            make.leading.top.trailing.equalToSuperview()
        }
        
        addSubview(panel)
        panel.snp.makeConstraints { (make) in
            make.top.equalTo(titleView.snp.bottom).offset(16)
            make.leading.trailing.equalToSuperview()
//            make.height.equalTo(283)
        }
        
        panel.addSubview(bookmakerIconView)
        bookmakerIconView.snp.makeConstraints { (make) in
            make.leading.equalToSuperview().offset(8)
            make.top.equalToSuperview().offset(12)
            make.height.equalTo(40)
            make.width.equalTo(96)
            make.bottom.equalToSuperview().offset(-12)
        }
        
        panel.addSubview(webPageButton)
        webPageButton.snp.makeConstraints { (make) in
            make.top.height.equalTo(bookmakerIconView)
            make.leading.equalTo(bookmakerIconView.snp.trailing).offset(8)
            make.width.equalTo(87)
        }
        
        panel.addSubview(stepper)
        stepper.snp.makeConstraints { (make) in
            make.trailing.equalToSuperview().offset(-8)
            make.height.equalTo(20)
            make.centerY.equalTo(bookmakerIconView)
            make.leading.greaterThanOrEqualTo(webPageButton.snp.trailing)
        }
        
//        panel.addSubview(bigImageView)
//        bigImageView.snp.makeConstraints { (make) in
//            make.leading.bottom.trailing.equalToSuperview()
//            make.top.equalTo(bookmakerIconView.snp.bottom).offset(10)
//        }
        
        addSubview(infoStack)
        infoStack.snp.makeConstraints { (make) in
            make.top.equalTo(panel.snp.bottom).offset(20)
            make.height.equalTo(165)
            make.leading.trailing.equalToSuperview()
        }
        
        addSubview(descLabel)
        descLabel.snp.makeConstraints { (make) in
            make.top.equalTo(infoStack.snp.bottom).offset(30)
            make.leading.trailing.equalToSuperview()
            make.bottom.equalToSuperview().offset(-30)
        }
    }
}
