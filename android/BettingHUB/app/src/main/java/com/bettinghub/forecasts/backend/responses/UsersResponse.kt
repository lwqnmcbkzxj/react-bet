package com.bettinghub.forecasts.backend.responses

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.bettinghub.forecasts.models.User

data class UsersResponse (
    @SerializedName("data")
    @Expose
    val data: List<User>
) {
}
