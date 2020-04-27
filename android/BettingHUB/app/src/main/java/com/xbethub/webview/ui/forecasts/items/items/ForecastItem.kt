package com.xbethub.webview.ui.forecasts.items.items

import com.xbethub.webview.models.Forecast

class ForecastItem(val forecast: Forecast):
    Item {
    override fun getType(): ItemType {
        return ItemType.FORECAST
    }
}
