package com.bettinghub.forecasts.ui.forecasts.sportItem

import com.bettinghub.forecasts.models.Sport


interface SportListener {
    fun onSportItemClick(sport: Sport)
}
