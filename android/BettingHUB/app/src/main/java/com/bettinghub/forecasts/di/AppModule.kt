package com.bettinghub.forecasts.di

import android.content.Context
import com.bettinghub.forecasts.AppData
import com.bettinghub.forecasts.Constants
import com.bettinghub.forecasts.Settings
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.di.scopes.AppScope
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
