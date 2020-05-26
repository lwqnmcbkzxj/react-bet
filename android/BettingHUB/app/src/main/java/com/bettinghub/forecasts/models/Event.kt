package com.bettinghub.forecasts.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Event (
    @SerializedName("championship_data")
    @Expose
    val championship: Championship,

    @SerializedName("coefficients")
    @Expose
    val coefficients: List<Map<String, String>>,

    @SerializedName("event_id")
    @Expose
    val eventId: Int,

    @SerializedName("event")
    @Expose
    val event: String,

    @SerializedName("event_start")
    @Expose
    val eventStart: String,

    @SerializedName("team_1")
    @Expose
    val team1: Team,

    @SerializedName("team_2")
    @Expose
    val team2: Team,

    @SerializedName("forecasts_count")
    @Expose
    val forecastCount: Int
): Serializable {
}
