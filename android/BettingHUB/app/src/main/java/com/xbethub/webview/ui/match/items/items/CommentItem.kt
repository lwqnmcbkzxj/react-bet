package com.xbethub.webview.ui.match.items.items

import com.xbethub.webview.models.Comment

class CommentItem(val level: Int, val comment: Comment): Item {

    override fun getType(): ItemType {
        return ItemType.values()[level];
    }
}
