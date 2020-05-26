package com.bettinghub.forecasts.ui.forecasts.items.items

import com.bettinghub.forecasts.models.Forecast

class ForecastItem(val forecast: Forecast?): Item {
    override fun getType(): ItemType {
        return ItemType.FORECAST
    }
}
