package com.xbethub.webview.http_client

import com.google.gson.JsonObject
import retrofit2.Call
import retrofit2.http.*

public interface BetApi {

    @Headers("Accept: application/json")
    @POST("/api/register")
    fun register(
        @Body user: JsonObject
    ) : Call<Void>

    @POST("/oauth/token")
    fun getToken(
        @Body authInfo: JsonObject
    ) : Call<String>

    @POST("api/forecastList")
    @Headers("Accept: application/json")
    fun getForeCasts(@Body parameters: JsonObject) : Call<String>

    @Headers("Accept: application/json")
    @GET("/api/user")
    fun getUser() : Call<String>
}
