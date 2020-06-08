package com.bettinghub.forecasts.ui.article

import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.article.items.ShowMoreItem

interface ItemListener {
    fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int)
    fun onAddComment(text: String, repliesTo: Int? = null, successCallback: (() -> Unit)? = null)
}
