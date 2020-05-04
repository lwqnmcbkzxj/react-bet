package com.xbethub.webview.enums

import com.xbethub.webview.R

enum class RatingTimeInterval(val stringRes: Int, val backendValue: String) {
    ALL_TIME(R.string.allTime, "")
    , MONTH(R.string.month, "")
}
