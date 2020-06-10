//
//  FullForecastRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 03.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IFullForecastRouter: class {
    
    func showForecaster(_ forecaster: Forecaster)
}

class FullForecastRouter: IFullForecastRouter {
    
    private let viewController: UIViewController
    private let coordinator: AppCoordinator
    
    init(viewController: UIViewController, coordinator: AppCoordinator) {
        self.viewController = viewController
        self.coordinator = coordinator
    }
    
    func showForecaster(_ forecaster: Forecaster) {
        let vc = coordinator.profile(forecaster: forecaster)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}

extension FullForecastRouter: ICommentsRouter {
    func reply(to comment: Comment) {
        let vc = coordinator.respondScreen(comment: comment,
                                           ref: comment.refTo.data,
                                           id: comment.refId.data)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
    
    func newComment(type: CommentType, id: Int) {
        let vc = coordinator.respondScreen(comment: nil, ref: type, id: id)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}
