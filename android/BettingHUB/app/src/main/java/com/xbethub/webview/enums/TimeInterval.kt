package com.xbethub.webview.enums

import com.xbethub.webview.R

enum class TimeInterval(val stringRes: Int, val backendValue: String) {
    ALL(R.string.allTime, "all")
    , H3(R.string.h3, "3h")
    , H6(R.string.h6, "6h")
    , H12(R.string.h12, "12h")
    , DAY(R.string.day, "day")


}
