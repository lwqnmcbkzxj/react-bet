package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class Forecast (
    @SerializedName("id")
    @Expose
    val id: Int,

    @SerializedName("user_data")
    @Expose
    val user: User,

    @SerializedName("event_data")
    @Expose
    val event: Event,

    @SerializedName("forecast_text")
    @Expose
    val text: String,

    @SerializedName("forecast_created_at")
    @Expose
    val createdAt: String,

    @SerializedName("bet_data")
    @Expose
    val bet: Bet,

    @SerializedName("forecast_stats")
    @Expose
    val stats: ForecastStats

): Serializable {}
