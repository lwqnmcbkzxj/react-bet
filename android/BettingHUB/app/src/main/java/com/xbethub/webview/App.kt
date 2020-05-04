package com.xbethub.webview

import android.app.Application
import androidx.multidex.MultiDexApplication
import com.google.gson.GsonBuilder
import com.xbethub.webview.di.AppComponent
import com.xbethub.webview.di.AppModule
import com.xbethub.webview.di.DaggerAppComponent
import com.xbethub.webview.http_client.BetApi
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class App: MultiDexApplication() {
    companion object {
        lateinit var appComponent: AppComponent
    }

    private lateinit var betApi: BetApi
    private lateinit var retrofit: Retrofit

    override fun onCreate() {
        super.onCreate()

        appComponent = DaggerAppComponent.builder()
            .appModule(AppModule(this))
            .build()

        initBetApi()
    }
    private fun initBetApi() {
        val gson = GsonBuilder()
            .setLenient()
            .create()
        retrofit = Retrofit.Builder()
            .baseUrl("http://betting-hub.sixhands.co") //Базовая часть адреса
            .addConverterFactory(GsonConverterFactory.create(gson)) //Конвертер, необходимый для преобразования JSON'а в объекты
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
