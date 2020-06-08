package com.bettinghub.forecasts.ui.profile.forecasts

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.navigation.NavController
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.forecasts.items.ForecastListener
import com.bettinghub.forecasts.ui.forecasts.items.items.ForecastItem
import com.bettinghub.forecasts.ui.forecasts.items.viewHolders.ForecastViewHolder

class ForecastAdapter(listener: ForecastListener, val navController: NavController): RecyclerViewAdapterBase<ForecastListener, ForecastItem, ForecastViewHolder>(listener) {

    override fun setListener(holder: ForecastViewHolder, listener: ForecastListener) {
        holder.setListener(listener)
    }

    override fun setModel(holder: ForecastViewHolder, model: ForecastItem) {
        holder.setForecastItem(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): ForecastViewHolder {
        return ForecastViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecast, parent, false), navController
        )
    }
}
