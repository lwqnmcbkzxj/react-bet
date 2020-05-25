//
//  TeamsVersusView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 21.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class TeamsVersusView: UIView {
    
    let leftImageView: UIImageView = {
        let view = UIImageView()
//        view.makeBordered()
        return view
    }()
    
    let rightImageView: UIImageView = {
        let view = UIImageView()
//        view.makeBordered()
        return view
    }()
    
    let leftTeamLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 17)
        view.textAlignment = .center
        view.text = "FlyToMoon"
        return view
    }()
    
    let rightTeamLabel: UILabel = {
        let view = UILabel()
        view.textColor = .titleBlack
        view.font = .robotoMedium(size: 17)
        view.textAlignment = .center
        view.text = "Team Unique"
        return view
    }()
    
    init() {
        super.init(frame: .zero)
        layer.borderWidth = 1
        layer.borderColor = UIColor.lineGray.cgColor
        layer.cornerRadius = 7
        
        makeLayout()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func makeLayout() {
        let separator = buildSeparator()
        addSubview(separator)
        separator.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.centerX.equalToSuperview()
        }
        
        let leftGuide = UILayoutGuide()
        addLayoutGuide(leftGuide)
        leftGuide.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.leading.equalToSuperview().offset(4)
            make.trailing.equalTo(separator.snp.leading)
        }
        
        addSubview(leftImageView)
        leftImageView.snp.makeConstraints { (make) in
            make.centerX.equalTo(leftGuide)
            make.width.height.equalTo(29)
            make.top.equalToSuperview().offset(8)
        }
        
        addSubview(leftTeamLabel)
        leftTeamLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(leftGuide)
            make.top.equalTo(leftImageView.snp.bottom).offset(5)
        }
        
        let rightGuide = UILayoutGuide()
        addLayoutGuide(rightGuide)
        rightGuide.snp.makeConstraints { (make) in
            make.top.bottom.equalToSuperview()
            make.trailing.equalToSuperview().offset(-4)
            make.leading.equalTo(separator.snp.trailing)
        }
        
        addSubview(rightImageView)
        rightImageView.snp.makeConstraints { (make) in
            make.centerX.equalTo(rightGuide)
            make.top.width.height.equalTo(leftImageView)
        }
        
        addSubview(rightTeamLabel)
        rightTeamLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalTo(rightGuide)
            make.top.equalTo(rightImageView.snp.bottom).offset(5)
        }
    }
    
    private func buildSeparator() -> UIView {
        let view = UIView()
        
        let line = UIView()
        line.backgroundColor = .lineGray
        view.addSubview(line)
        line.snp.makeConstraints { (make) in
            make.width.equalTo(1)
            make.top.bottom.equalToSuperview()
            make.centerX.equalToSuperview()
        }
        
        let circle = UIView()
        circle.layer.borderWidth = 1
        circle.layer.borderColor = UIColor.lineGray.cgColor
        circle.layer.cornerRadius = 17
        circle.backgroundColor = .white
        view.addSubview(circle)
        circle.snp.makeConstraints { (make) in
            make.centerY.equalToSuperview()
            make.leading.trailing.equalToSuperview()
            make.width.height.equalTo(34)
        }
        
        let label = UILabel()
        label.textColor = .textGrayDark
        label.font = .robotoMedium(size: 14)
        label.text = "VS"
        label.textAlignment = .center
        view.addSubview(label)
        label.snp.makeConstraints { (make) in
            make.top.equalTo(circle).offset(2)
            make.leading.trailing.bottom.equalTo(circle)
        }
        
        return view
    }
}
