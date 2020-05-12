package com.xbethub.webview.ui.home.bookmakerItem.items

import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerTableItemBase
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerTableItemType

class HeaderBookmakerTableItem:
    BookmakerTableItemBase {
    override fun getItemType(): BookmakerTableItemType {
        return BookmakerTableItemType.HEADER
    }
}
