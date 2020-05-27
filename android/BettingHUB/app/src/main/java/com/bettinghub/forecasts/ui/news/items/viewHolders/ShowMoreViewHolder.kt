package com.bettinghub.forecasts.ui.news.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.ui.news.NewsViewModel

class ShowMoreViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    fun setViewModel(viewModel: NewsViewModel) {
        itemView.setOnClickListener { viewModel.onShowMoreClick() }
    }
}
