package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Team (
    @SerializedName("name")
    @Expose
    val name: String
): Serializable
