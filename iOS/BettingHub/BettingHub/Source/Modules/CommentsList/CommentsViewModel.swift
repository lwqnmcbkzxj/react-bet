//
//  CommentsViewModel.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 22.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

enum CommentsSorting: String {
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
    
    var commentsSorting: CommentsSorting {
        guard let index = headerView.sortingSelector.selectedIndex else {
            return .byRating
        }
        
        return headerView.sortingSelector.sortings[index]
    }
    
    private lazy var headerView: CommentsSectionHeader = {
        let view = CommentsSectionHeader()
        view.configure(commentsCount: 0)
        view.delegate = self
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
            self.items = self.buildTree(sorting: self.commentsSorting, items: comments)
            self.tableView.reloadSections([self.sectionNumber], with: .automatic)
        }
    }
    
    @objc private func newComment() {
        commentsRouter.newComment(type: commentType, id: id)
    }
    
    private func buildTree(sorting: CommentsSorting, items: [Comment]) -> [CommentCellViewModelItem] {
        let threads = buildThreads(comments: items, topReplyId: nil, sorting: sorting)
        let linear = buildLinear(from: threads)
        let withLines = setupLines(items: linear)
        return withLines
    }
    
    private struct CommentsThread {
        var comment: CommentCellViewModelItem
        var nested: [CommentsThread]
    }
    
    private func sortingCallback(for sorting: CommentsSorting) -> ((Comment, Comment) -> Bool) {
        switch sorting {
        case .byRating:
            return { $0.rating.data > $1.rating.data }
            
        case .byTime:
            return { $0.createDate.data < $1.createDate.data }
        }
    }
    
    private func buildThreads(comments: [Comment],
                              topReplyId: Int?,
                              sorting: CommentsSorting) -> [CommentsThread] {

        let filterCallback: (Comment) -> Bool = topReplyId == nil
            ? { $0.replyId.data == nil }
            : { $0.replyId.data == topReplyId! }
        
        let sortingCallback = self.sortingCallback(for: sorting)
        
        let topLevel = comments
            .filter(filterCallback)
            .sorted(by: sortingCallback)
            .map { CommentCellViewModelItem(with: $0) }


        let withNested = topLevel.map { (commentItem) -> CommentsThread in
            let possibleNested = comments.filter { (comment) -> Bool in
                !topLevel.contains { $0.comment.id == comment.id }
            }
            let nestedThreads = buildThreads(comments: possibleNested,
                                             topReplyId: commentItem.comment.id,
                                             sorting: sorting)
            return CommentsThread(comment: commentItem, nested: nestedThreads)
        }
        
        let withParents = setupParents(for: withNested, level: 0)

        return withParents
    }
    
    private func setupParents(for threads: [CommentsThread], level: Int) -> [CommentsThread] {
        threads.map { (thread) in
            var new = thread.comment
            new.parentsCount = level
            let newNested = setupParents(for: thread.nested, level: level + 1)
            return CommentsThread(comment: new,
                                  nested: newNested)
        }
    }
    
    private func setupLines(items: [CommentCellViewModelItem]) -> [CommentCellViewModelItem] {
        if items.count < 1 { return items }
        
        var withLines = [CommentCellViewModelItem]()
        
        for i in 0..<items.count - 1 {
            var item = items[i]
            let next = items[i+1]
            item.shortLines = item.parentsCount - next.parentsCount
            if item.shortLines < 0 { item.shortLines = 0 }
            item.longLines = item.parentsCount - item.shortLines
            
            withLines.append(item)
        }
        
        var last = items[items.count - 1]
        last.longLines = last.parentsCount
        withLines.append(last)
        
        return withLines
    }
    
    private func buildLinear(from threads: [CommentsThread]) -> [CommentCellViewModelItem] {
        let linear = threads
            .map { [$0.comment] + buildLinear(from: $0.nested) }
            .reduce([], +)
        return linear
    }
}

extension CommentsViewModel: CommentsSectionHeaderDelegate {
    
    func changedSorting(_ header: CommentsSectionHeader) {
        reload()
    }
}
