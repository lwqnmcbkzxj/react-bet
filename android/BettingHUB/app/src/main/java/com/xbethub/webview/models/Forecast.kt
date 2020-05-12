package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class Forecast (
    @SerializedName("id")
    @Expose
    val id: Int,

    @SerializedName("user_id")
    @Expose
    val userId: Int,

    @SerializedName("event_id")
    @Expose
    val eventId: Int,

    @SerializedName("coefficient_id")
    @Expose
    val coefficientId: Int,

    @SerializedName("forecast_text")
    @Expose
    val forecastText: String,

    @SerializedName("bet")
    @Expose
    val bet: String,

    @SerializedName("created_at")
    @Expose
    val createdAt: String,

    @SerializedName("updated_at")
    @Expose
    val updatedAt: String,

    @SerializedName("sport_id")
    @Expose
    val sportId: Int,

    @SerializedName("championship_id")
    @Expose
    val championship_id: Int,

    @SerializedName("title")
    @Expose
    val title: String,

    @SerializedName("start")
    @Expose
    val start: String,

    @SerializedName("status")
    @Expose
    val status: Int,

    @SerializedName("count_comments")
    @Expose
    val commentsCount: Int,

    @SerializedName("count_likes")
    @Expose
    val likesCount: Int,

    @SerializedName("count_dislikes")
    @Expose
    val dislikesCount: Int,

    @SerializedName("description")
    @Expose
    val description: String,

    @SerializedName("user_data")
    @Expose
    val user: User
): Serializable {}
