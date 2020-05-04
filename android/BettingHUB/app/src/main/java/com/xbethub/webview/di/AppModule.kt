package com.xbethub.webview.di

import android.content.Context
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.di.scopes.AppScope
import dagger.Module
import dagger.Provides

@Module
class AppModule(val appContext: Context) {
    @Provides
    @AppScope
    fun provideContext(): Context {
        return appContext
    }

    @Provides
    @AppScope
    fun provideBackend(): BettingHubBackend {
        return BettingHubBackend()
    }
}
