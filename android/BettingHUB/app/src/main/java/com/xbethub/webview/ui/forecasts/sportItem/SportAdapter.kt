package com.xbethub.webview.ui.forecasts.sportItem

import android.view.LayoutInflater
import android.view.ViewGroup
import com.xbethub.webview.R
import com.xbethub.webview.ui.RecyclerViewAdapterBase

class SportAdapter(var listener: SportListener): RecyclerViewAdapterBase<SportListener, SportItem, SportViewHolder>(listener) {
    override fun setListener(holder: SportViewHolder, listener: SportListener) {
        holder.setListener(listener)
    }

    override fun setModel(holder: SportViewHolder, model: SportItem) {
        holder.setSportItem(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): SportViewHolder {
        return SportViewHolder(
            LayoutInflater.from(parent.context)
            .inflate(R.layout.item_sport, parent, false)
        )
    }
}
