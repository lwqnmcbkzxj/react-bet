package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class ForecastStats (
    @SerializedName("count_subscribers")
    @Expose
    val subscriberCount: Int,

    @SerializedName("count_comments")
    @Expose
    val commentCount: Int,

    @SerializedName("rating")
    @Expose
    val rating: Int
): Serializable {
}
