package com.xbethub.webview.ui.forecasts

import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Sport

class ForecastFilter() {
    var sport: Sport? = null
    var timeInterval = TimeInterval.ALL
    var forecastType = ForecastType.ALL
}
