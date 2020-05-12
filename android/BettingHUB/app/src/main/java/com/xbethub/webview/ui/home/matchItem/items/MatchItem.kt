package com.xbethub.webview.ui.home.matchItem.items

class MatchItem(val last: Boolean):
    MatchTableItemBase {
    override fun getItemType(): MatchTableItemType {
        return MatchTableItemType.MATCH
    }
}
