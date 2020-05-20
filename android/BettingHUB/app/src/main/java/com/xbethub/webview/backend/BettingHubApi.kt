package com.xbethub.webview.backend

import com.xbethub.webview.backend.requests.ForecastsRequest
import com.xbethub.webview.backend.requests.TokenRequest
import com.xbethub.webview.backend.requests.RegisterUserRequest
import com.xbethub.webview.backend.responses.ForecastsResponse
import com.xbethub.webview.backend.responses.TokenResponse
import com.xbethub.webview.backend.responses.UsersResponse
import com.xbethub.webview.models.*
import io.reactivex.Completable
import io.reactivex.Observable
import retrofit2.http.*

interface BettingHubApi {

    @GET("forecasts")
    fun forecasts(@Query("limit") limit: Int, @Query("sport_id") sportId: Int
                  , @Query("time") time: Int, @Query("page") page: Int): Observable<List<Forecast>>

    @GET("bookmakers")
    fun bookmakers(): Observable<List<Bookmaker>>

    @GET("bookmakers/{id}")
    fun bookmaker(@Path("id") id: Int): Observable<Bookmaker>

    @GET("events")
    fun matches(): Observable<List<Event>>

    @GET("users")
    fun users(@Query("limit") limit: Int, @Query("page") page: Int
              , @Query("direction") direction: String): Observable<UsersResponse>

    @GET("users/profile")
    fun user(@Header("Authorization") token: String): Observable<User>

    @GET("sports")
    fun sport(): Observable<List<Sport>>

    @POST("register")
    fun registerUser(@Body registerUserRequest: RegisterUserRequest): Completable

    @POST("/oauth/token")
    fun token(@Body tokenRequest: TokenRequest): Observable<TokenResponse>
}
