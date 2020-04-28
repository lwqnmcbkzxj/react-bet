package com.xbethub.webview.backend

import com.xbethub.webview.backend.requests.ForecastsListRequest
import com.xbethub.webview.models.Forecast
import io.reactivex.Observable
import retrofit2.http.Body
import retrofit2.http.POST

interface BettingHubApi {
    @POST("forecastList")
    fun forecastList(@Body forecastsListRequest: ForecastsListRequest): Observable<List<Forecast>>
}
