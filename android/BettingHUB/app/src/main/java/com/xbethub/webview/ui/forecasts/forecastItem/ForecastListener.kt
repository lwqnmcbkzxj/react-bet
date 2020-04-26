package com.xbethub.webview.ui.forecasts.forecastItem

import com.xbethub.webview.models.Forecast

interface ForecastListener {
    fun onForecastClick(forecast: Forecast, position: Int)
}
