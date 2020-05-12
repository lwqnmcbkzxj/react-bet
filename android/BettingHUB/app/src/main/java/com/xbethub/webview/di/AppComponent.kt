package com.xbethub.webview.di

import android.content.Context
import com.xbethub.webview.AppData
import com.xbethub.webview.Constants
import com.xbethub.webview.Settings
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.di.scopes.AppScope
import dagger.Component

@AppScope
@Component(modules = [AppModule::class])
interface AppComponent {
    fun getContext(): Context
    fun getBackend(): BettingHubBackend
    fun getSettings(): Settings
    fun getConstants(): Constants
    fun getAppData(): AppData
}
