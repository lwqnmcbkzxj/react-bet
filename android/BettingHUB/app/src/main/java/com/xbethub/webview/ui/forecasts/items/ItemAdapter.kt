package com.xbethub.webview.ui.forecasts.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.ui.RecyclerViewAdapterBase
import com.xbethub.webview.ui.forecasts.ForecastsViewModel
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import com.xbethub.webview.ui.forecasts.items.items.Item
import com.xbethub.webview.ui.forecasts.items.items.ItemType
import com.xbethub.webview.ui.forecasts.items.viewHolders.FooterViewHolder
import com.xbethub.webview.ui.forecasts.items.viewHolders.ForecastViewHolder
import com.xbethub.webview.ui.forecasts.items.viewHolders.HeaderViewHolder
import com.xbethub.webview.ui.forecasts.items.viewHolders.ShowMoreViewHolder

class ItemAdapter(listener: ForecastListener, private val viewModel: ForecastsViewModel?, private val lifecycleOwner: LifecycleOwner?)
    : RecyclerViewAdapterBase<ForecastListener, Item, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: ForecastListener) {
        when (holder) {
            is ForecastViewHolder -> holder.setListener(listener)
            is HeaderViewHolder -> holder.setViewModel(viewModel!!, lifecycleOwner!!)
            is ShowMoreViewHolder -> holder.setViewModel(viewModel!!)
        }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: Item) {
        when (holder) {
            is ForecastViewHolder -> holder.setForecastItem(model as ForecastItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getType().ordinal;
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.FORECAST -> return ForecastViewHolder(
                                    LayoutInflater.from(parent.context)
                                        .inflate(R.layout.item_forecast, parent, false)
                                )

            ItemType.HEADER -> return HeaderViewHolder(LayoutInflater.from(parent.context)
                                        .inflate(R.layout.item_forecasts_header, parent, false)
                                    )

            ItemType.SHOW_MORE_BTN -> return ShowMoreViewHolder(LayoutInflater.from(parent.context)
                                        .inflate(R.layout.item_forecasts_show_more_btn, parent, false)
                                    )

            else -> return FooterViewHolder(LayoutInflater.from(parent.context)
                                .inflate(R.layout.item_footer, parent, false)
                            )
        }
    }

}
