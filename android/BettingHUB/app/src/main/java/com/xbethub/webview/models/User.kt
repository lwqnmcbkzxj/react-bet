package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class User (
    @SerializedName("id")
    @Expose
    val id: Int,

    @SerializedName("avatar")
    @Expose
    val avatar: String?,

    @SerializedName("login")
    @Expose
    val login: String
) {
}
