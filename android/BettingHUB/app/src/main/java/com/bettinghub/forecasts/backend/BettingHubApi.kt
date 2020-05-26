package com.bettinghub.forecasts.backend

import com.bettinghub.forecasts.backend.requests.TokenRequest
import com.bettinghub.forecasts.backend.requests.RegisterUserRequest
import com.bettinghub.forecasts.backend.responses.Response
import com.bettinghub.forecasts.backend.responses.TokenResponse
import com.bettinghub.forecasts.backend.responses.UsersResponse
import com.bettinghub.forecasts.models.*
import io.reactivex.Completable
import io.reactivex.Observable
import retrofit2.http.*

interface BettingHubApi {

    @GET("forecasts")
    fun forecasts(@Query("limit") limit: Int, @Query("sport_id") sportId: Int
                  , @Query("time") time: Int, @Query("page") page: Int): Observable<Response<List<Forecast>>>

    @GET("users/{id}/forecasts")
    fun userForecasts(@Path("id") id: Int): Observable<Response<List<Forecast>>>

    @GET("bookmakers")
    fun bookmakers(): Observable<List<Bookmaker>>

    @GET("posts")
    fun articles(): Observable<Response<List<Article>>>

    @GET("posts/{id}")
    fun article(@Path("id") id: Int): Observable<Article>

    @GET("/policy")
    fun privacy(): Observable<Text>

    @GET("bookmakers/{id}")
    fun bookmaker(@Path("id") id: Int): Observable<Bookmaker>

    @GET("events")
    fun matches(): Observable<List<Event>>

    @GET("events/{id}")
    fun match(@Path("id") id: Int): Observable<Event>

    @GET("users")
    fun users(@Query("limit") limit: Int, @Query("page") page: Int
              , @Query("direction") direction: String): Observable<UsersResponse>

    @GET("users/profile")
    fun user(@Header("Authorization") token: String): Observable<User>

    @FormUrlEncoded
    @POST("users/update/email")
    fun updateEmail(@Header("Authorization") token: String, @Field("email") email: String): Observable<List<String>>

    @GET("sports")
    fun sport(): Observable<List<Sport>>

    @POST("register")
    fun registerUser(@Body registerUserRequest: RegisterUserRequest, @Header("Accept") accept: String = "application/json"): Completable

    @POST("/oauth/token")
    fun token(@Body tokenRequest: TokenRequest): Observable<TokenResponse>
}
