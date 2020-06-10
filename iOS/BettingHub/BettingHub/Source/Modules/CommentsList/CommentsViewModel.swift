//
//  CommentsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

enum CommentsSorting {
    case byTime
    case byRating
}

struct CommentCellViewModelItem {
    
    let comment: Comment
    
    var parentsCount: Int = 0
    var shortLines = 0
    var longLines = 0
    
    let maximumNesting = 3
    
    init(with comment: Comment) {
        self.comment = comment
    }
    
    var dateText: String {
        let formatter = CommentCellViewModelItem.formatter
        return formatter.string(from: comment.updateDate.data)
    }
    
    private static let formatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        formatter.doesRelativeDateFormatting = true
        return formatter
    }()
}

class CommentsViewModel: TableSectionProvider {
    
    @LazyInjected
    private var commentService: ICommentService
    
    let commentsRouter: ICommentsRouter
    
    private weak var tableView: UITableView!
    let sectionNumber: Int
    private let cellId = "commentCell"
    
    let commentType: CommentType
    let id: Int
    
    var commentsSorting: CommentsSorting = .byTime
    
    private let headerView: CommentsSectionHeader = {
        let view = CommentsSectionHeader()
        view.configure(commentsCount: 0)
        return view
    }()
    
    private lazy var footerView: CommentsSectionFooter = {
        let view = CommentsSectionFooter()
        view.button.addTarget(self, action: #selector(newComment), for: .touchUpInside)
        return view
    }()
    
    private var items: [CommentCellViewModelItem] = []
    
    init(tableView: UITableView, sectionNumber: Int,
         type: CommentType, id: Int, router: ICommentsRouter) {
        self.tableView = tableView
        self.commentType = type
        self.id = id
        self.sectionNumber = sectionNumber
        self.commentsRouter = router
        
        tableView.register(CommentCell.self, forCellReuseIdentifier: cellId)
    }
    
    func header() -> UIView? {
        headerView.configure(commentsCount: items.count)
        return headerView
    }
    
    func headerHeight() -> CGFloat {
        return 60
    }
    
    func footer() -> UIView? {
        return footerView
    }
    
    func numberOfCells() -> Int {
        return items.count
    }
    
    func cell(for row: Int) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId) as! CommentCell
        cell.configure(with: items[row])
        cell.router = commentsRouter
        return cell
    }
    
    func reload() {
        commentService.comments(for: commentType, id: id).onComplete { (comments) in
            print("got comments")
            self.items = self.buildCommentsTree(comments: comments)
            self.tableView.reloadSections([self.sectionNumber], with: .automatic)
        }
    }
    
    @objc private func newComment() {
        commentsRouter.newComment(type: commentType, id: id)
    }
    
    func buildCommentsTree(comments: [Comment]) -> [CommentCellViewModelItem] {
        var items = [CommentCellViewModelItem]()
        var map: [Int: CommentCellViewModelItem] = [:] //id: item
        var replies: [Int: [Int]] = [:] // id: replies ids
        
        func countNestedTo(id: Int) -> Int {
            let nested = replies[id] ?? []
            let count = nested.reduce(1) { $0 + countNestedTo(id: $1) }
            return count
        }
        
        for comment in comments.reversed() {
            var item = CommentCellViewModelItem(with: comment)
            
            //count spacing
            if let parentId = comment.replyId.data, let parentItem = map[parentId] {
                item.parentsCount = parentItem.parentsCount + 1 > item.maximumNesting
                                    ? item.maximumNesting
                                    : parentItem.parentsCount + 1
                
                let totalReplies = countNestedTo(id: parentId)
                let parentIndex = items.firstIndex(where: { $0.comment.id == parentId} )!
                
                replies[parentId] = (replies[parentId] ?? []) + [comment.id]
                items.insert(item, at: parentIndex + totalReplies)
            } else {
                items.append(item)
            }
            
            map[comment.id] = item
        }
        
        
        //setup lines
        if items.count < 1 { return items }
        
        for i in 0..<items.count - 1 {
            var item = items[i]
            let next = items[i+1]
            item.shortLines = item.parentsCount - next.parentsCount
            if item.shortLines < 0 { item.shortLines = 0 }
            item.longLines = item.parentsCount - item.shortLines
            
            items[i] = item
        }
        
        var last = items[items.count - 1]
        last.longLines = last.parentsCount
        items[items.count - 1] = last
        
        return items
    }
    
//    struct CommentsThread {
//        var comment: CommentCellViewModelItem
//        var nested: [CommentsThread]
//    }
    
//    private func buildThread(comments: [CommentCellViewModelItem], level: Int) -> [CommentsThread] {
//
//    }
//
//    private func sortByTime() -> [CommentCellViewModelItem] {
//
//    }
    
//    private func buildThreadsByRating(comments: [Comment], topReplyId: Int?) -> [CommentsThread] {
//
//        let filterCallback: (Comment) -> Bool = topReplyId == nil
//            ? { $0.replyId.data == nil }
//            : { $0.replyId.data == topReplyId! }
//
//        let topLevel = comments
//            .filter(filterCallback)
//            .sorted { $0.rating.data > $1.rating.data }
//            .map { CommentCellViewModelItem(with: $0) }
//            .map { CommentsThread(comment: $0, nested: []) }
//
//
//        let withNested = topLevel.map { (thread) -> CommentsThread in
//            let nestedComments = comments.filter { $0.replyId.data == thread.comment.comment.id }
//            let nestedThreads = buildThreadsByRating(comments: nestedComments,
//                                                     topReplyId: thread.comment.comment.id)
//            return CommentsThread(comment: thread.comment, nested: nestedThreads)
//        }
//
//        return withNested
//    }
    
//    private func setupLines(for threads: [CommentsThread], level: Int) -> [CommentsThread] {
//        threads.map { (thread) in
//            var new = thread.comment
//            new.parentsCount = level
//            let newNested =
//            return CommentsThread(comment: new,
//                                  nested: thread.nested)
//        }
//    }
}
