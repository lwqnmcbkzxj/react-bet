package com.xbethub.webview.ui.forecast.items.items

import com.xbethub.webview.models.Forecast

class HeaderItem(val forecast: Forecast): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
