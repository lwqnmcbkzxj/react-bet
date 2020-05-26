package com.bettinghub.forecasts.ui.home.bookmakerItem

import com.bettinghub.forecasts.models.Bookmaker

interface BookmakerItemListener {
    fun onBookmakerClick(bookmaker: Bookmaker, position: Int)
}
