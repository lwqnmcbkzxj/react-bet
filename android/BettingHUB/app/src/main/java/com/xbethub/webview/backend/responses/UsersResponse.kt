package com.xbethub.webview.backend.responses

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.xbethub.webview.models.User

data class UsersResponse (
    @SerializedName("data")
    @Expose
    val data: List<User>
) {
}
