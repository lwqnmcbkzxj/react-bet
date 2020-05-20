package com.xbethub.webview.ui.match.items.items

import com.xbethub.webview.models.Event

class HeaderItem(val match: Event): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
