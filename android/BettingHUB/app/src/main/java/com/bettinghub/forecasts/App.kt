package com.bettinghub.forecasts

import androidx.multidex.MultiDexApplication
import com.bettinghub.forecasts.di.AppComponent
import com.bettinghub.forecasts.di.AppModule
import com.bettinghub.forecasts.di.DaggerAppComponent

class App: MultiDexApplication() {
    companion object {
        lateinit var appComponent: AppComponent
    }

    override fun onCreate() {
        super.onCreate()

        appComponent = DaggerAppComponent.builder()
            .appModule(AppModule(this))
            .build()
    }
}
