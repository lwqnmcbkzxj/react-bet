package com.xbethub.webview.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class Forecast (
    @SerializedName("UserName")
    @Expose
    val userName: String,

    @SerializedName("UserAvatar")
    @Expose
    val userAvatar: String,

    @SerializedName("SportName")
    @Expose
    val sportName: String,

    @SerializedName("Tournament")
    @Expose
    val tournament: String,

    @SerializedName("ForecastId")
    @Expose
    val forecastId: Int,

    @SerializedName("Time")
    @Expose
    val time: String,

    @SerializedName("Text")
    @Expose
    val text: String,

    @SerializedName("BetValue")
    @Expose
    val betValue: String,

    @SerializedName("CratedAt")
    @Expose
    val createdAt: String,

    @SerializedName("Coefficient")
    @Expose
    val coefficient: String,

    @SerializedName("CommentsQuanity")
    @Expose
    val commentCount: Int,

    @SerializedName("Rating")
    @Expose
    val rating: Int,

    @SerializedName("FavAmmount")
    @Expose
    val favAmmount: Int
): Serializable {
    override fun toString(): String {
        return "Forecast(userName='$userName', userAvatar='$userAvatar', sportName='$sportName', tournament='$tournament', forecastId=$forecastId, time='$time', text='$text', betValue='$betValue', createdAt='$createdAt', coefficient='$coefficient', commentCount=$commentCount, rating=$rating, favAmmount=$favAmmount)"
    }
}
