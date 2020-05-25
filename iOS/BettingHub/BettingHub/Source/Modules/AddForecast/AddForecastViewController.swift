//
//  AddForecastViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class AddForecastViewController: UIViewController {
    
    private let imageView: UIImageView = {
        let image = UIImage(named: "filtersIcon")!.withRenderingMode(.alwaysTemplate)
        let view = UIImageView(image: image)
        view.contentMode = .scaleAspectFit
        view.tintColor = .textGray
        return view
    }()
    
    private let soonLabel: UILabel = {
        let view = UILabel()
        view.font = .robotoBold(size: 30)
        view.textColor = .textGray
        view.text = Text.soon
        view.textAlignment = .center
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        setView(soonView())
    }
    
    private func soonView() -> UIView {
        let view = UIView()
        view.backgroundColor = .white
        
        view.addSubview(imageView)
        imageView.snp.makeConstraints { (make) in
            make.width.height.equalTo(view.snp.width).dividedBy(2.3)
            make.center.equalTo(view)
        }
        
        view.addSubview(soonLabel)
        soonLabel.snp.makeConstraints { (make) in
            make.centerX.equalTo(view)
            make.top.equalTo(imageView.snp.bottom).offset(15)
        }
        
        return view
    }
}
