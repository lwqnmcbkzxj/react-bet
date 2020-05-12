package com.xbethub.webview.backend.requests

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.xbethub.webview.enums.TimeInterval

data class ForecastsRequest (
    var page: Int,
    var sportId: Int,
    var time: Int,
    var limit: Int
) {}
