//
//  DefaultPreview.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 20.04.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

#if canImport(SwiftUI) && DEBUG
import SwiftUI

@available(iOS 13, *)
protocol Preview {
    associatedtype V: UIView
    associatedtype PreviewView: View
    static var previews: PreviewView { get }
}

@available(iOS 13, *)
extension Preview {
    static var previews: some View {
        UIViewPreview {
            V()
        }
    }
}
#endif
