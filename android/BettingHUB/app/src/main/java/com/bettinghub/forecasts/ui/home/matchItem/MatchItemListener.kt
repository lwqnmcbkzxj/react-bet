package com.bettinghub.forecasts.ui.home.matchItem

import com.bettinghub.forecasts.models.Event

interface MatchItemListener {

    fun onMatchClick(match: Event, position: Int)
}
