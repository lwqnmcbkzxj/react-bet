package com.xbethub.webview.ui.home.recycler_view_adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R

class LastForecastsTableAdapter (private val myDataset: Array<String>) :
    RecyclerView.Adapter<LastForecastsTableAdapter.MyViewHolder>() {
    class MyViewHolder(val forecastCard: ConstraintLayout) : RecyclerView.ViewHolder(forecastCard)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val forecastCard = LayoutInflater.from(parent.context).inflate(R.layout.card_forecast, parent, false) as ConstraintLayout
        return MyViewHolder(forecastCard)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {

    }

    override fun getItemCount() = myDataset.size
}
