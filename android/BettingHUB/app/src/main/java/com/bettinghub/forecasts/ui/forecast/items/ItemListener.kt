package com.bettinghub.forecasts.ui.forecast.items

import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.forecast.items.items.ShowMoreItem

interface ItemListener {
    fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int)
    fun onForecasterClick(user: User)
    fun onAddComment(text: String, repliesTo: Int? = null, successCallback: (() -> Unit)? = null)
}