package com.xbethub.webview.ui.bookmakerRating.items.items

class BookmakerItem(val last: Boolean):
    BookmakerTableItemBase {
    override fun getItemType(): BookmakerTableItemType {
        return BookmakerTableItemType.BOOKMAKER
    }
}
