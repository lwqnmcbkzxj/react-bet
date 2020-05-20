package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class Championship (
    @SerializedName("championship_id")
    @Expose
    val championshipId: Int,

    @SerializedName("championship")
    @Expose
    val championship: String,

    @SerializedName("sport_id")
    @Expose
    val sportId: Int,

    @SerializedName("sport_name")
    @Expose
    val sportName: String,

    @SerializedName("sport_image")
    @Expose
    val sportImage: String
) {
}
