package com.bettinghub.forecasts.backend.requests

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class RegisterUserRequest (
    @SerializedName("username")
    @Expose
    var username: String,

    @SerializedName("email")
    @Expose
    var email: String,

    @SerializedName("password")
    @Expose
    var password: String
){
}
