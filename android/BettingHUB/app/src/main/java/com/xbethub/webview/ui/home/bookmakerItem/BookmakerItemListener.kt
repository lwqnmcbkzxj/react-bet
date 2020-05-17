package com.xbethub.webview.ui.home.bookmakerItem

import com.xbethub.webview.models.Bookmaker

interface BookmakerItemListener {
    fun onBookmakerClick(bookmaker: Bookmaker, position: Int)
}
