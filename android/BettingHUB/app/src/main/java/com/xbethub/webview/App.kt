package com.xbethub.webview

import androidx.multidex.MultiDexApplication
import com.xbethub.webview.di.AppComponent
import com.xbethub.webview.di.AppModule
import com.xbethub.webview.di.DaggerAppComponent

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
