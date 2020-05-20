package com.xbethub.webview.ui.bookmaker.items

import com.xbethub.webview.ui.bookmaker.items.items.ShowMoreItem

interface ItemListener {
    fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int)

    fun onLinkClick(link: String)
}
