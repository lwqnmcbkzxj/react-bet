package com.bettinghub.forecasts.ui.addForecast.tableCell.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.databinding.ItemOutcomeTableColumnHeaderBinding
import com.bettinghub.forecasts.ui.addForecast.tableCell.items.ColumnHeaderItem

class ColumnHeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    val binding = ItemOutcomeTableColumnHeaderBinding.bind(itemView)

    fun setColumnHeaderItem(columnHeaderItem: ColumnHeaderItem) {
        binding.name.text = columnHeaderItem.name
    }
}
