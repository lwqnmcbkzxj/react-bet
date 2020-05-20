package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class User (
    @SerializedName("id")
    @Expose
    val id: Int,

    @SerializedName("login")
    @Expose
    val login: String,

    @SerializedName("email")
    @Expose
    var email: String,

    @SerializedName("avatar")
    @Expose
    val avatar: String?,

    @SerializedName("balance")
    @Expose
    val balance: String?,

    @SerializedName("rating_position")
    @Expose
    val ratingPosition: Int,

    @SerializedName("stats")
    @Expose
    val stats: UserStats,

    @SerializedName("last_five")
    @Expose
    val lastFive: List<Boolean>
): Serializable {
}
