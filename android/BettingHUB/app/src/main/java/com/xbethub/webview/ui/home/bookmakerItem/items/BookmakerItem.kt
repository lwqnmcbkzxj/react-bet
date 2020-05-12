package com.xbethub.webview.ui.home.bookmakerItem.items

class BookmakerItem(val last: Boolean):
    BookmakerTableItemBase {
    override fun getItemType(): BookmakerTableItemType {
        return BookmakerTableItemType.BOOKMAKER
    }
}
