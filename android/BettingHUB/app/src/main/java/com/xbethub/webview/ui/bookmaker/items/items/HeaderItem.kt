package com.xbethub.webview.ui.bookmaker.items.items

import com.xbethub.webview.models.Bookmaker

class HeaderItem(val bookmaker: Bookmaker?): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
