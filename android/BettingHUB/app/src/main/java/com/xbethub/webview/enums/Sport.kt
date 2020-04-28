package com.xbethub.webview.enums

import com.xbethub.webview.R

enum class Sport(val stringRes: Int, val backendValue: String) {
    ALL(R.string.allSports, "all")
    , FOOTBALL(R.string.football, "1")
    , TENNIS(R.string.tennis, "2")
    , BASKETBALL(R.string.basketball, "3")
    , HOCKEY(R.string.hockey, "4")
    , OTHER(R.string.other, "5")
}
