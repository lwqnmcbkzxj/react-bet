package com.xbethub.webview.ui.forecasts.forecastItem

import android.view.LayoutInflater
import android.view.ViewGroup
import com.xbethub.webview.R
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.RecyclerViewAdapterBase

class ForecastAdapter(listener: ForecastListener): RecyclerViewAdapterBase<ForecastListener, Forecast, ForecastViewHolder>(listener) {
    override fun setListener(holder: ForecastViewHolder, listener: ForecastListener) {
        holder.setListener(listener)
    }

    override fun setModel(holder: ForecastViewHolder, model: Forecast) {
        holder.forecast = model
    }

    override fun createView(parent: ViewGroup, viewType: Int): ForecastViewHolder {
        return ForecastViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecast, parent, false)
        )
    }

}
