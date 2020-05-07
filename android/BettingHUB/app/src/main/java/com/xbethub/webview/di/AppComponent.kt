package com.xbethub.webview.di

import android.content.Context
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
}
