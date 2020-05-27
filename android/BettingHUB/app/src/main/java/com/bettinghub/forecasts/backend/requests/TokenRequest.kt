package com.bettinghub.forecasts.backend.requests

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class TokenRequest(
    @SerializedName("grant_type")
    @Expose
    var grantType: String = "password",

    @SerializedName("client_id")
    @Expose
    var clientId: Int = 2,

    @SerializedName("client_secret")
    @Expose
    var clientSecret: String = "V79SdKGIlqFgbmlRGLNIm5r8wPevKerRePbqwzDT",

    @SerializedName("username")
    @Expose
    var username: String,

    @SerializedName("password")
    @Expose
    var password: String
) {
}
