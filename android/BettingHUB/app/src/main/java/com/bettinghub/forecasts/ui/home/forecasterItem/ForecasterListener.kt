package com.bettinghub.forecasts.ui.home.forecasterItem

import com.bettinghub.forecasts.models.User

interface ForecasterListener {
    fun onForecasterClick(user: User, position: Int)
}
