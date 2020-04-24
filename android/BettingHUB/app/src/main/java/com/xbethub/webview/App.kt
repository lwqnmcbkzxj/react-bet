package com.xbethub.webview

import android.app.Application
import com.xbethub.webview.http_client.BetApi
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class App: Application() {
    private lateinit var betApi: BetApi
    private lateinit var retrofit: Retrofit
    override fun onCreate() {
        super.onCreate()
        initBetApi()
    }
    private fun initBetApi() {
        retrofit = Retrofit.Builder()
            .baseUrl("https://mydistr.pushkeen.ru") //Базовая часть адреса
            .addConverterFactory(GsonConverterFactory.create()) //Конвертер, необходимый для преобразования JSON'а в объекты
            .build()
        betApi = retrofit.create(BetApi::class.java)
    }
    fun getApi(): BetApi {
        if (!(this::betApi.isInitialized && this::retrofit.isInitialized)) {
            initBetApi()
        }
        return betApi
    }
}