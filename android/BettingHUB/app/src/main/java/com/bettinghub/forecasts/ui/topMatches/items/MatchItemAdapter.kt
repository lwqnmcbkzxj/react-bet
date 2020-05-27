package com.bettinghub.forecasts.ui.topMatches.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerTableItemType
import com.bettinghub.forecasts.ui.topMatches.items.items.MatchItem
import com.bettinghub.forecasts.ui.topMatches.items.items.MatchTableItemBase

class MatchItemAdapter(listener: MatchItemListener)
    : RecyclerViewAdapterBase<MatchItemListener, MatchTableItemBase, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: MatchItemListener) {
        when (holder) {
            is MatchItemViewHolder -> holder.setListener(listener)
        }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: MatchTableItemBase) {
        when (holder) {
            is MatchItemViewHolder -> holder.setBookmakerItem(model as MatchItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getItemType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (BookmakerTableItemType.values()[viewType]) {
            BookmakerTableItemType.BOOKMAKER -> return MatchItemViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_match_rating_table_line, parent, false))
            BookmakerTableItemType.FOOTER -> return MatchFooterViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_footer, parent, false))
            else -> return MatchTableHeaderViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_match_rating_table_header, parent, false))
        }
    }
}
