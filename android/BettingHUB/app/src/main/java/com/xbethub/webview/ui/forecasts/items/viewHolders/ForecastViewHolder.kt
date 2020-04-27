package com.xbethub.webview.ui.forecasts.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemForecastBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ForecastListener

class ForecastViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private var binding: ItemForecastBinding = ItemForecastBinding.bind(itemView)
    lateinit var forecast: Forecast

    fun setListener(listener: ForecastListener) {
        itemView.setOnClickListener { listener.onForecastClick(forecast, adapterPosition) }
    }
}
