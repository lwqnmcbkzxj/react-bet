package com.xbethub.webview.ui.profile.forecasts

import android.view.LayoutInflater
import android.view.ViewGroup
import com.xbethub.webview.R
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.RecyclerViewAdapterBase
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import com.xbethub.webview.ui.forecasts.items.viewHolders.ForecastViewHolder

class ForecastAdapter(listener: ForecastListener): RecyclerViewAdapterBase<ForecastListener, ForecastItem, ForecastViewHolder>(listener) {


    override fun setListener(holder: ForecastViewHolder, listener: ForecastListener) {
        holder.setListener(listener)
    }

    override fun setModel(holder: ForecastViewHolder, model: ForecastItem) {
        holder.setForecastItem(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): ForecastViewHolder {
        return ForecastViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecast, parent, false)
        )
    }
}
