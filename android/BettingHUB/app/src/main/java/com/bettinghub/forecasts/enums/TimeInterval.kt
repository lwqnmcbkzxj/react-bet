package com.bettinghub.forecasts.enums

import com.bettinghub.forecasts.R

enum class TimeInterval(val stringRes: Int, val backendValue: Int) {
    ALL(R.string.allTime, 0)
    , H3(R.string.h3, 1)
    , H6(R.string.h6, 2)
    , H12(R.string.h12, 3)
    , DAY(R.string.day, 4)


}
