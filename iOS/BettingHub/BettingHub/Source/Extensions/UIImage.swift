//
//  UIImage.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

extension UIImageView {
    func setImage(url: String) {
        //TODO: add placeholder image
        guard let url = URL(string: url) else { return }
        DispatchQueue.global(qos: .background).async {
            guard
                let data = try? Data(contentsOf: url),
                let image = UIImage(data: data)
            else { return }
            DispatchQueue.main.async {
                self.image = image
            }
        }
    }
}
