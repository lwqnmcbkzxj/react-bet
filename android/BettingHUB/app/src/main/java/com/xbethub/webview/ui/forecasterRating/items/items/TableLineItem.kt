package com.xbethub.webview.ui.forecasterRating.items.items

import com.xbethub.webview.models.ForecasterRating

class TableLineItem(val forecasterRating: ForecasterRating): Item {
    override fun getType(): ItemType {
        return ItemType.TABLE_LINE
    }
}
