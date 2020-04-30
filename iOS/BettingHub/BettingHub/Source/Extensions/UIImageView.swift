//
//  UIImageView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UIImageView {
    func setImage(url: String?) {
        //TODO: add placeholder image
//        let fullURL = baseURL.appendingPathComponent(url)
        //TODO: change after migration to new server
        guard let url = url, !url.isEmpty else  { return }
        let fullURL = URL(string: "http://xbethub.com")!.appendingPathComponent(url)
        DispatchQueue.global(qos: .background).async {
            guard
                let data = try? Data(contentsOf: fullURL),
                let image = UIImage(data: data)
            else { return }
            DispatchQueue.main.async {
                self.image = image
            }
        }
    }
    
    func makeBordered() {
        layer.borderWidth = 1
        layer.borderColor = UIColor.lineGray.cgColor
    }
}
