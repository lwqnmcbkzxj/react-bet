package com.bettinghub.forecasts.di

import android.content.Context
import com.bettinghub.forecasts.AppData
import com.bettinghub.forecasts.Constants
import com.bettinghub.forecasts.Settings
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.di.scopes.AppScope
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
