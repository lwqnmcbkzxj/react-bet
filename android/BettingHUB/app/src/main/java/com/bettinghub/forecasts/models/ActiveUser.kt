package com.bettinghub.forecasts.models

data class ActiveUser(val accessToken: String, val refreshToken: String) {
    var user: User? = null
}
