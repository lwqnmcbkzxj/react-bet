package com.xbethub.webview.ui.home.matchItem.items

import com.xbethub.webview.models.Match

class MatchItem(val match: Match, val last: Boolean):
    MatchTableItemBase {
    override fun getItemType(): MatchTableItemType {
        return MatchTableItemType.MATCH
    }
}
