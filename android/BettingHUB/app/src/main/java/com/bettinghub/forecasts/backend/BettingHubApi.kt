package com.bettinghub.forecasts.backend

import com.bettinghub.forecasts.backend.requests.TokenRequest
import com.bettinghub.forecasts.backend.requests.RegisterUserRequest
import com.bettinghub.forecasts.backend.responses.Response
import com.bettinghub.forecasts.backend.responses.TokenResponse
import com.bettinghub.forecasts.backend.responses.UsersResponse
import com.bettinghub.forecasts.models.*
import io.reactivex.Completable
import io.reactivex.Observable
import okhttp3.MultipartBody
import okhttp3.ResponseBody
import retrofit2.http.*

interface BettingHubApi {

    @GET("forecasts")
    fun forecasts(@Header("Authorization") token: String, @Query("limit") limit: Int, @Query("sport_id") sportId: Int
                  , @Query("time") time: Int, @Query("page") page: Int): Observable<Response<List<Forecast>>>

    @GET("users/{id}/subscription")
    fun subscriptionForecasts(@Path("id") id: Int?, @Header("Authorization") token: String?, @Query("limit") limit: Int, @Query("sport_id") sportId: Int
                              , @Query("time") time: Int, @Query("page") page: Int): Observable<Response<List<Forecast>>>

    @GET("users/{id}/forecasts")
    fun userForecasts(@Path("id") id: Int): Observable<Response<List<Forecast>>>

    @GET("bookmakers")
    fun bookmakers(): Observable<List<Bookmaker>>

    @POST("forecasts/{id}/mark")
    fun addToFavorite(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("users/{id}/subscription")
    fun subscribe(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("forecasts/{id}/like")
    fun likeForecast(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("forecasts/{id}/dislike")
    fun dislikeForecast(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("posts/{id}/like")
    fun likeArticle(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("posts/{id}/dislike")
    fun dislikeArticle(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("comments/{id}/like")
    fun likeComment(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @POST("comments/{id}/dislike")
    fun dislikeComment(@Path("id") id: Int, @Header("Authorization") token: String): Observable<retrofit2.Response<ResponseBody>>

    @GET("forecasts/marked")
    fun favorite(@Header("Authorization") token: String): Observable<Response<List<Forecast>>>

    @GET("forecasts/{id}/comments?order_by=rating")
    fun forecastComments(@Header("Authorization") token: String, @Path("id") id: Int): Observable<List<Comment>>

    @POST("forecasts/{id}/comment")
    fun forecastComment(@Header("Authorization") token: String, @Path("id") id: Int, @Body body: Map<String, String?>): Observable<Comment>

    @GET("posts/{id}/comments?order_by=rating")
    fun articleComments(@Header("Authorization") token: String, @Path("id") id: Int): Observable<List<Comment>>

    @POST("posts/{id}/comment")
    fun articleComment(@Header("Authorization") token: String, @Path("id") id: Int, @Body body: Map<String, String?>): Observable<Comment>

    @Multipart
    @POST("avatar")
    fun loadAvatar(@Header("Authorization") token: String?, @Part avatar: MultipartBody.Part): Observable<retrofit2.Response<ResponseBody>>

    @GET("posts")
    fun articles(): Observable<Response<List<Article>>>

    @GET("news")
    fun news(): Observable<Response<List<News>>>

    @GET("posts/{id}")
    fun article(@Path("id") id: Int): Observable<Article>

    @GET("/policy")
    fun privacy(): Observable<Text>

    @GET("bookmakers/{id}")
    fun bookmaker(@Path("id") id: Int): Observable<Bookmaker>

    @GET("events")
    fun matches(@Query("limit") limit: Int, @Query("page") page: Int): Observable<Response<List<Event>>>

    @GET("events/{id}")
    fun match(@Path("id") id: Int): Observable<Event>

    @GET("users")
    fun users(@Header("Authorization") token: String, @Query("limit") limit: Int, @Query("page") page: Int
              , @Query("direction") direction: String, @Query("sport_id") sportId: Int? = null, @Query("month") month: Int? = null): Observable<UsersResponse>

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
