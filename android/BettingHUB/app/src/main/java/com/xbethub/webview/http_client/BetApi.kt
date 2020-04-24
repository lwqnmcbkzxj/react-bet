package com.xbethub.webview.http_client

import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

public interface BetApi {
    @POST("/api/register")
    fun register(
        @Body user: String
    )
    @GET("/outputemail")
    fun events(

    )
}