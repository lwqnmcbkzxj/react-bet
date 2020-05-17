package com.xbethub.webview.ui.match.items.items

import com.xbethub.webview.ui.forecasterRating.ForecasterRating

class ForecasterTableLineItem(val forecasterRating: ForecasterRating): Item {
    override fun getType(): ItemType {
        return ItemType.FORECASTER_TABLE_LINE
    }
}
