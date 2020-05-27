package com.bettinghub.forecasts.ui.bookmakerRating.items

import com.bettinghub.forecasts.models.Bookmaker

interface BookmakerItemListener {

    fun onBookmakerClick(bookmaker: Bookmaker)
}
