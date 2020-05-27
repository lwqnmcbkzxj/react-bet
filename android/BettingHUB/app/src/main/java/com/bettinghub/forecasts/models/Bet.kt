package com.bettinghub.forecasts.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Bet (
    @SerializedName("bet")
    @Expose
    val bet: String,

    @SerializedName("coefficient")
    @Expose
    val coefficient: String,

    @SerializedName("type")
    @Expose
    val type: String,

    @SerializedName("pure_profit")
    @Expose
    val netProfit: Double
): Serializable {
}
