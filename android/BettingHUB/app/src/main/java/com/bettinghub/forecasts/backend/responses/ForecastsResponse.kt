package com.bettinghub.forecasts.backend.responses

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.bettinghub.forecasts.models.Forecast

data class ForecastsResponse (
    @SerializedName("current_page")
    @Expose
    val currentPage: Int,

    @SerializedName("data")
    @Expose
    val data: List<Forecast>
) {
}
