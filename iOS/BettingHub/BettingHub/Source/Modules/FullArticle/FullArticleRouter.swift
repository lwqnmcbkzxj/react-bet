//
//  FullArticleRouter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 23.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

protocol IFullArticleRouter: class {
    
    func show(article: Article)
}


class FullArticleRouter {
    
    weak var coordinator: AppCoordinator!
    weak var viewController: UIViewController!
}

extension FullArticleRouter: IFullArticleRouter {
    
    func show(article: Article) {
        let vc = coordinator.fullArticleScreen(article: article)
        viewController.navigationController?.pushViewController(vc, animated: true)
    }
}

extension FullArticleRouter: ICommentsRouter {
    
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
