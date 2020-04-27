package com.xbethub.webview.http_client

import com.google.gson.JsonObject
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

public interface BetApi {
    @POST("/api/register")
    fun register(
        @Body user: JsonObject
    ) : Call<Void>
    @GET("/outputemail")
    fun events(

    )
}
