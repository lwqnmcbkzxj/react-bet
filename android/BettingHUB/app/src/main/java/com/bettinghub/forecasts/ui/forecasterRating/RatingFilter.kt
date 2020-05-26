package com.bettinghub.forecasts.ui.forecasterRating

import com.bettinghub.forecasts.enums.RatingTimeInterval
import com.bettinghub.forecasts.models.Sport

class RatingFilter {
    var sport: Sport? = null
    var timeInterval: RatingTimeInterval = RatingTimeInterval.MONTH
}
