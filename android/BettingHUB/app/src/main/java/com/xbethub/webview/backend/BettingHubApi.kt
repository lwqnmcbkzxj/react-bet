package com.xbethub.webview.backend

import com.xbethub.webview.backend.requests.ForecastsRequest
import com.xbethub.webview.backend.requests.TokenRequest
import com.xbethub.webview.backend.requests.RegisterUserRequest
import com.xbethub.webview.backend.responses.ForecastsResponse
import com.xbethub.webview.backend.responses.TokenResponse
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.Sport
import io.reactivex.Completable
import io.reactivex.Observable
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface BettingHubApi {
    @GET("forecasts")
    fun forecasts(@Query("limit") limit: Int, @Query("sport_id") sportId: Int
                  , @Query("time") time: Int, @Query("page") page: Int): Observable<ForecastsResponse>

    @GET("sports")
    fun sport(): Observable<List<Sport>>

    @POST("register")
    fun registerUser(@Body registerUserRequest: RegisterUserRequest): Completable

    @POST("/oauth/token")
    fun token(@Body tokenRequest: TokenRequest): Observable<TokenResponse>
}
