package com.xbethub.webview.ui.addForecast.tableCell.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemOutcomeTableColumnHeaderBinding
import com.xbethub.webview.ui.addForecast.tableCell.items.ColumnHeaderItem

class ColumnHeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    val binding = ItemOutcomeTableColumnHeaderBinding.bind(itemView)

    fun setColumnHeaderItem(columnHeaderItem: ColumnHeaderItem) {
        binding.name.text = columnHeaderItem.name
    }
}
