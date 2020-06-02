package com.bettinghub.forecasts.models

data class ActiveUser(val accessToken: String, val refreshToken: String, var id: Int = -1) {
    var user: User? = null
}
