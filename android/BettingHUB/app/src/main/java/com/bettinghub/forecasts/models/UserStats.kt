package com.bettinghub.forecasts.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class UserStats (
    @SerializedName("roi")
    @Expose
    val roi: String?,

    @SerializedName("average_cofficient")
    @Expose
    val avgCoeff: String?,

    @SerializedName("pure_profit")
    @Expose
    val netProfit: String,

    @SerializedName("count_win")
    @Expose
    val winCount: Int,

    @SerializedName("count_loss")
    @Expose
    val lossCount: Int,

    @SerializedName("count_wait")
    @Expose
    val waitCount: Int,

    @SerializedName("count_back")
    @Expose
    val returnCount: Int,

    @SerializedName("count_subscribers")
    @Expose
    val subscriberCount: Int,

    @SerializedName("count_subscriptions")
    @Expose
    val subscriptionCount: Int
): Serializable {
}
