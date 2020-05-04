package com.xbethub.webview.ui.forecasts

import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.Sport
import com.xbethub.webview.enums.TimeInterval

class ForecastFilter() {
    var sport = Sport.ALL
    var timeInterval = TimeInterval.ALL
    var forecastType = ForecastType.ALL
}
