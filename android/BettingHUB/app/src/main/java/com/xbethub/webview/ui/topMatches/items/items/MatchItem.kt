package com.xbethub.webview.ui.topMatches.items.items

import com.xbethub.webview.models.Event

class MatchItem(val match: Event?, val last: Boolean):
    MatchTableItemBase {
    override fun getItemType(): MatchTableItemType {
        return MatchTableItemType.MATCH
    }
}
