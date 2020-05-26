package com.bettinghub.forecasts.ui.match.items

import com.bettinghub.forecasts.ui.match.items.items.ShowMoreItem

interface ItemListener {
    fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int)
}
