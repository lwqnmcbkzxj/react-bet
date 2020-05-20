package com.xbethub.webview.ui.topMatches.items

import com.xbethub.webview.models.Bookmaker
import com.xbethub.webview.models.Event

interface MatchItemListener {

    fun onMatchClick(match: Event)
}
