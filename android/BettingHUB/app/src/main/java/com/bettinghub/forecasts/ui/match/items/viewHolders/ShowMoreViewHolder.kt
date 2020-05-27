package com.bettinghub.forecasts.ui.match.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.databinding.ItemCommentShowMoreBinding
import com.bettinghub.forecasts.ui.match.items.ItemListener
import com.bettinghub.forecasts.ui.match.items.items.ShowMoreItem

class ShowMoreViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemCommentShowMoreBinding.bind(itemView)
    lateinit var showMoreItem: ShowMoreItem

    fun setListener(listener: ItemListener) {
        binding.showMoreBtn.setOnClickListener { listener.onShowMoreBtnClick(showMoreItem, adapterPosition) }
    }
}
