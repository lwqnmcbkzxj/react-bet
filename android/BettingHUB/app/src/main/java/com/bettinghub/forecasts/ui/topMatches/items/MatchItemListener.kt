package com.bettinghub.forecasts.ui.topMatches.items

import com.bettinghub.forecasts.models.Event

interface MatchItemListener {

    fun onMatchClick(match: Event)
}
