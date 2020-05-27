package com.bettinghub.forecasts.ui.addForecast.tableCell.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.databinding.ItemOutcomeTableCellBinding
import com.bettinghub.forecasts.ui.addForecast.tableCell.CellItemListener
import com.bettinghub.forecasts.ui.addForecast.tableCell.items.CellItem

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
