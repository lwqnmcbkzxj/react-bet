//
//  LanguageSelector.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 04.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class LanguageSelector: PanelSegmenterControl {
    
    var selectedLanguage: Language? {
        guard let index = selectedSegment else { return nil }
        return langItems[index]
    }
    
    private let langItems: [Language] = [.rus, .eng]
    
    init() {
        let items = langItems.map { $0.rawValue.localized }
        super.init(items: items)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
