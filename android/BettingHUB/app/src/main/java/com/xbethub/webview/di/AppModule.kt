package com.xbethub.webview.di

import android.content.Context
import com.xbethub.webview.AppData
import com.xbethub.webview.Constants
import com.xbethub.webview.Settings
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

    @Provides
    @AppScope
    fun provideSettings(): Settings {
        return Settings(appContext)
    }

    @Provides
    @AppScope
    fun provideConstants(): Constants {
        return Constants(appContext)
    }

    @Provides
    @AppScope
    fun provideAppData(): AppData {
        return AppData()
    }
}
