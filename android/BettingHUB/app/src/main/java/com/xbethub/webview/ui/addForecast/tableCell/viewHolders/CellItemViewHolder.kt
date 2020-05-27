package com.xbethub.webview.ui.addForecast.tableCell.viewHolders

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemOutcomeTableCellBinding
import com.xbethub.webview.ui.addForecast.tableCell.CellItemListener
import com.xbethub.webview.ui.addForecast.tableCell.items.CellItem

class CellItemViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private lateinit var cellItem: CellItem
    private val binding = ItemOutcomeTableCellBinding.bind(itemView)

    fun setCellItem(cellItem: CellItem) {
        this.cellItem = cellItem

        if (cellItem.value.isEmpty()) {
            binding.value.visibility = View.GONE
            binding.logoCV.visibility = View.VISIBLE;
        } else {
            binding.value.visibility = View.VISIBLE
            binding.logoCV.visibility = View.GONE;

            binding.value.text = cellItem.value
        }
    }

    fun setListener(listener: CellItemListener) {
        itemView.setOnClickListener {
            listener.onCellItemClick(cellItem, adapterPosition)
        }
    }
}
