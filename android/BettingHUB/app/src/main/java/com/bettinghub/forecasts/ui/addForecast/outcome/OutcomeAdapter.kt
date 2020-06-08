package com.bettinghub.forecasts.ui.addForecast.outcome

import android.view.LayoutInflater
import android.view.ViewGroup
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase

class OutcomeAdapter(listener: OutcomeListener)
    : RecyclerViewAdapterBase<OutcomeListener, OutcomeItem, OutcomeViewHolder>(listener) {

    override fun setListener(holder: OutcomeViewHolder, listener: OutcomeListener) {
        holder.setListener(listener)
    }

    override fun setModel(holder: OutcomeViewHolder, model: OutcomeItem) {
        holder.setOutcomeItem(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): OutcomeViewHolder {
        return OutcomeViewHolder(LayoutInflater.from(parent.context)
            .inflate(R.layout.item_outcome, parent, false))
    }
}