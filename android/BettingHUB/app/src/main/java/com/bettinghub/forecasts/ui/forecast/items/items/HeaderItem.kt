package com.bettinghub.forecasts.ui.forecast.items.items

import com.bettinghub.forecasts.models.Forecast

class HeaderItem(val forecast: Forecast): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
