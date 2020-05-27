package com.xbethub.webview.ui.addForecast.tableCell

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.ui.RecyclerViewAdapterBase
import com.xbethub.webview.ui.addForecast.tableCell.items.CellItem
import com.xbethub.webview.ui.addForecast.tableCell.items.ColumnHeaderItem
import com.xbethub.webview.ui.addForecast.tableCell.items.Item
import com.xbethub.webview.ui.addForecast.tableCell.items.ItemType
import com.xbethub.webview.ui.addForecast.tableCell.viewHolders.CellItemViewHolder
import com.xbethub.webview.ui.addForecast.tableCell.viewHolders.ColumnHeaderViewHolder

class CellAdapter(cellItemListener: CellItemListener)
    : RecyclerViewAdapterBase<CellItemListener, Item, RecyclerView.ViewHolder>(cellItemListener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: CellItemListener) {
        (holder as? CellItemViewHolder)?.let { it.setListener(listener) }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: Item) {
        when (holder) {
            is ColumnHeaderViewHolder -> holder.setColumnHeaderItem(model as ColumnHeaderItem)
            is CellItemViewHolder -> holder.setCellItem(model as CellItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getItemType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.COLUMN_HEADER -> return ColumnHeaderViewHolder(LayoutInflater.from(parent.context)
                                            .inflate(R.layout.item_outcome_table_column_header, parent, false)
                                        )
            else -> return CellItemViewHolder(LayoutInflater.from(parent.context)
                            .inflate(R.layout.item_outcome_table_cell, parent, false)
                        )
        }
    }
}
