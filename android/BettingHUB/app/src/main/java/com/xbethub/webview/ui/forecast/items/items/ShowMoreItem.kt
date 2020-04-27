package com.xbethub.webview.ui.forecast.items.items

import com.xbethub.webview.ui.forecast.items.items.Item
import com.xbethub.webview.ui.forecast.items.items.ItemType

class ShowMoreItem(val items: List<Item>): Item {

    override fun getType(): ItemType {
        return ItemType.SHOW_MORE
    }
}
