package com.xbethub.webview

import android.app.Application
import com.xbethub.webview.http_client.BetApi
import okhttp3.ResponseBody
import retrofit2.Converter
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.lang.reflect.Type


class App: Application() {
    private lateinit var betApi: BetApi
    private lateinit var retrofit: Retrofit
    override fun onCreate() {
        super.onCreate()
        initBetApi()
    }
    private fun initBetApi() {
        retrofit = Retrofit.Builder()
            .baseUrl("http://betting-hub.sixhands.co") //Базовая часть адреса
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
