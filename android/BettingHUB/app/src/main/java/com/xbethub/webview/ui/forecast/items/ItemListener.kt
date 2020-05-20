package com.xbethub.webview.ui.forecast.items

import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecast.items.items.ShowMoreItem

interface ItemListener {
    fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int)
    fun onForecasterClick(user: User)
}
