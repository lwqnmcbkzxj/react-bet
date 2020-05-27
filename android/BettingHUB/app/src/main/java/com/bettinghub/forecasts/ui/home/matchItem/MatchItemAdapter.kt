package com.bettinghub.forecasts.ui.home.matchItem

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.home.matchItem.items.MatchItem
import com.bettinghub.forecasts.ui.home.matchItem.items.MatchTableItemBase
import com.bettinghub.forecasts.ui.home.matchItem.items.MatchTableItemType

class MatchItemAdapter(listener: MatchItemListener)
    : RecyclerViewAdapterBase<MatchItemListener, MatchTableItemBase, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: MatchItemListener) {
        if (holder is MatchItemViewHolder) holder.setListener(listener)
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: MatchTableItemBase) {
        when (holder) {
            is MatchItemViewHolder -> holder.setMatchItem(model as MatchItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getItemType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (MatchTableItemType.values()[viewType]) {
            MatchTableItemType.MATCH -> return MatchItemViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_match_rating_table_line, parent, false))

            else -> return HeaderMatchTableViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_match_rating_table_header, parent, false))
        }
    }
}
