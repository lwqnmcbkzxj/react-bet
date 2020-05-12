package com.xbethub.webview.ui.forecasterRating

import com.xbethub.webview.enums.RatingTimeInterval
import com.xbethub.webview.models.Sport

class RatingFilter {
    var sport: Sport? = null
    var timeInterval: RatingTimeInterval = RatingTimeInterval.MONTH
}
