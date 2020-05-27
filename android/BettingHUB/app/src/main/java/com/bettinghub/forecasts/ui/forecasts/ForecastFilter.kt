package com.bettinghub.forecasts.ui.forecasts

import com.bettinghub.forecasts.enums.ForecastType
import com.bettinghub.forecasts.enums.TimeInterval
import com.bettinghub.forecasts.models.Sport

class ForecastFilter() {
    var sport: Sport? = null
    var timeInterval = TimeInterval.ALL
    var forecastType = ForecastType.ALL
}
