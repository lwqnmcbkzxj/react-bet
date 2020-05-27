package com.bettinghub.forecasts.ui.bookmaker.items

import com.bettinghub.forecasts.ui.bookmaker.items.items.ShowMoreItem

interface ItemListener {
    fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int)

    fun onLinkClick(link: String)
}
