package com.xbethub.webview.ui.forecasts.items

import com.xbethub.webview.models.Forecast

interface ForecastListener {
    fun onForecastClick(forecast: Forecast, position: Int)
}
