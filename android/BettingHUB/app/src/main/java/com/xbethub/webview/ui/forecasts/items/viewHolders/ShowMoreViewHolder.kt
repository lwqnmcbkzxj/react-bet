package com.xbethub.webview.ui.forecasts.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.ui.forecasts.ForecastsViewModel

class ShowMoreViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    fun setViewModel(viewModel: ForecastsViewModel) {
        itemView.setOnClickListener { viewModel.onShowMoreBtnClick() }
    }
}
