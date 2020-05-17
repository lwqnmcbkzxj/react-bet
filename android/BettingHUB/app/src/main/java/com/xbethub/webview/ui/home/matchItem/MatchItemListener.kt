package com.xbethub.webview.ui.home.matchItem

import com.xbethub.webview.models.Match

interface MatchItemListener {

    fun onMatchClick(match: Match, position: Int)
}
