package com.xbethub.webview.ui.home.bookmakerItem.items

import com.xbethub.webview.models.Bookmaker

class BookmakerItem(val bookmaker: Bookmaker, val last: Boolean):
    BookmakerTableItemBase {
    override fun getItemType(): BookmakerTableItemType {
        return BookmakerTableItemType.BOOKMAKER
    }
}
