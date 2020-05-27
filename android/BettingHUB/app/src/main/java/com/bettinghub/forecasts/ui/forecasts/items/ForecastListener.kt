package com.bettinghub.forecasts.ui.forecasts.items

import com.bettinghub.forecasts.models.Forecast

interface ForecastListener {
    fun onForecastClick(forecast: Forecast, position: Int)
}
