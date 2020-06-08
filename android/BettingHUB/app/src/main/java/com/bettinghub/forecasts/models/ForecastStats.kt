package com.bettinghub.forecasts.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class ForecastStats (
    @SerializedName("count_subscribers")
    @Expose
    var subscriberCount: Int,

    @SerializedName("count_comments")
    @Expose
    val commentCount: Int,

    @SerializedName("rating")
    @Expose
    var rating: Int
): Serializable {
}
