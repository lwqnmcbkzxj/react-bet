package com.xbethub.webview.ui.match.items.items

import com.xbethub.webview.models.Match

class HeaderItem(val match: Match): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
