package com.xbethub.webview.backend

import com.xbethub.webview.backend.requests.ForecastsListRequest
import com.xbethub.webview.backend.requests.GetTokenRequest
import com.xbethub.webview.backend.requests.RegisterUserRequest
import com.xbethub.webview.models.Forecast
import io.reactivex.Completable
import io.reactivex.Observable
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface BettingHubApi {
    @POST("forecastList")
    fun forecastList(@Body forecastsListRequest: ForecastsListRequest): Observable<List<Forecast>>

    @POST("register")
    fun registerUser(@Body registerUserRequest: RegisterUserRequest): Completable

    @POST("/oauth/token")
    fun getToken(@Body getTokenRequest: GetTokenRequest): Observable<String>
}
