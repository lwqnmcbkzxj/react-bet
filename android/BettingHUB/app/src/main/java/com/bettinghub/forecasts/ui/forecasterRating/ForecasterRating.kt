package com.bettinghub.forecasts.ui.forecasterRating

import com.bettinghub.forecasts.models.User

data class ForecasterRating(val user: User?, val number: Int, var last:Boolean) {

}

