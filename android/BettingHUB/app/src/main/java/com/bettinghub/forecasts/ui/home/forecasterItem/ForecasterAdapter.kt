package com.bettinghub.forecasts.ui.home.forecasterItem

import android.view.LayoutInflater
import android.view.ViewGroup
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase

class ForecasterAdapter(val itemWidth: Int, listener: ForecasterListener)
    : RecyclerViewAdapterBase<ForecasterListener, User?, ForecasterViewHolder>(listener) {

    override fun setListener(holder: ForecasterViewHolder, listener: ForecasterListener) {
        holder.setListener(listener)
    }

    override fun setModel(holder: ForecasterViewHolder, model: User?) {
            holder.setUser(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): ForecasterViewHolder {
        return ForecasterViewHolder(itemWidth
            , LayoutInflater.from(parent.context).inflate(R.layout.item_forecaster, parent, false))
    }
}
