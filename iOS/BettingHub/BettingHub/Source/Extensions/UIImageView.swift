//
//  UIImageView.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 17.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

fileprivate class InMemoryImageCache {
    
    private let cache: NSCache<NSString, UIImage> = {
        let cache = NSCache<NSString, UIImage>()
        cache.totalCostLimit = 30 * 1024 * 1024 //maximum storing limit 30 mb
        return cache
    }()
    
    fileprivate static let shared = InMemoryImageCache()
    
    private init() {}
    
    fileprivate func save(key: String, image: UIImage) {
        let nsString = NSString(string: key)
        cache.setObject(image, forKey: nsString)
    }
    
    fileprivate func findImage(key: String) -> UIImage? {
        let nsString = NSString(string: key)
        return cache.object(forKey: nsString)
    }
}

extension UIImageView {
    func setImage(url: String?, placeholder: UIImage? = UIImage(named: "userEmptyIcon")) {
        //If url is empty just set the placeholder
        guard let url = url, !url.isEmpty else  {
            image = placeholder
            return
        }
        
        //check if image for url is already cached
        if let image = InMemoryImageCache.shared.findImage(key: url) {
            self.image = image
            return
        }
        
        //image loading needed. Set the temp placeholder
        image = placeholder
        
        //TODO: change after migration to new server
        //let fullURL = baseURL.appendingPathComponent(url)
        let fullURL = URL(string: "https://app.betthub.org")!.appendingPathComponent(url)
        
        DispatchQueue.global(qos: .background).async {
            guard
                let data = try? Data(contentsOf: fullURL),
                let image = UIImage(data: data)
            else { return }
            
            InMemoryImageCache.shared.save(key: url, image: image)
            
            DispatchQueue.main.async {
                self.image = image
                
            }
        }
    }
    
    func setServerIcon(url: String?) {
        //If url is empty just set the placeholder
        guard let url = url, !url.isEmpty else  {
            return
        }
        self.image = nil 
        //check if image for url is already cached
        if let image = InMemoryImageCache.shared.findImage(key: url) {
            self.image = image
            return
        }
        let fullURL = baseURL.appendingPathComponent(url)
        
        DispatchQueue.global(qos: .background).async {
            guard
                let data = try? Data(contentsOf: fullURL),
                let image = UIImage(data: data)
            else { return }
            
            InMemoryImageCache.shared.save(key: url, image: image)
            
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
