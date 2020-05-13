package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class Team (
    @SerializedName("name")
    @Expose
    val name: String
) {
}
