package com.bettinghub.forecasts.ui.article.items

import com.bettinghub.forecasts.models.Comment

class CommentItem(val level: Int, val comment: Comment): Item {

    override fun getType(): ItemType {
        return ItemType.values()[level];
    }
}
