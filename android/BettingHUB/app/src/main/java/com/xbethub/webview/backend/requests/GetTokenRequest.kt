package com.xbethub.webview.backend.requests

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class GetTokenRequest(
    @SerializedName("grant_type")
    @Expose
    var grant_type: String = "password",

    @SerializedName("client_id")
    @Expose
    var client_id: Int = 2,

    @SerializedName("client_secret")
    @Expose
    var client_secret: String = "V79SdKGIlqFgbmlRGLNIm5r8wPevKerRePbqwzDT",

    @SerializedName("username")
    @Expose
    var username: String,

    @SerializedName("password")
    @Expose
    var password: String
) {
}
