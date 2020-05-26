package com.bettinghub.forecasts.enums

import com.bettinghub.forecasts.R

enum class RatingTimeInterval(val stringRes: Int, val backendValue: String) {
    ALL_TIME(R.string.allTime, "")
    , MONTH(R.string.month, "")
}
