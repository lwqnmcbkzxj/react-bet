package com.xbethub.webview.backend.requests

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.xbethub.webview.enums.TimeInterval

data class ForecastsListRequest (
    @SerializedName("page")
    @Expose
    var page: Int,

    @SerializedName("quantity")
    @Expose
    var quantity: Int,

    @SerializedName("tf")
    @Expose
    var timeInterval: String,

    @SerializedName("sport")
    @Expose
    var sport: String,

    @SerializedName("useSubscribes")
    @Expose
    var useSubscribes: Int,

    @SerializedName("useFavorites")
    @Expose
    var useFavorites: Int
) {}
