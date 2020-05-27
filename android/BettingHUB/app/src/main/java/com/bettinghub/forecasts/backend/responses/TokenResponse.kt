package com.bettinghub.forecasts.backend.responses

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class TokenResponse(
    @SerializedName("token_type")
    @Expose
    var tokenType: String,

    @SerializedName("expires_in")
    @Expose
    var expiresIn: Long,

    @SerializedName("access_token")
    @Expose
    var accessToken: String,

    @SerializedName("refresh_token")
    @Expose
    var refreshToken: String
) {
}
