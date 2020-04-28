package com.xbethub.webview.backend

import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory

class BettingHubBackend {
    var api: BettingHubApi
        private set

    init {
        val retrofit = Retrofit.Builder()
            .baseUrl("http://betting-hub.sixhands.co/api/")
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        api = retrofit.create(BettingHubApi::class.java)
    }
}
