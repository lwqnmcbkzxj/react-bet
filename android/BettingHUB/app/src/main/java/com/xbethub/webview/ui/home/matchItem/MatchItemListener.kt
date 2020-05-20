package com.xbethub.webview.ui.home.matchItem

import com.xbethub.webview.models.Event

interface MatchItemListener {

    fun onMatchClick(match: Event, position: Int)
}
