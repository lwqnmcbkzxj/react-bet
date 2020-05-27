package com.bettinghub.forecasts.backend.requests

data class ForecastsRequest (
    var page: Int,
    var sportId: Int,
    var time: Int,
    var limit: Int
) {}
