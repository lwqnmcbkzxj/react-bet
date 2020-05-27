package com.bettinghub.forecasts.ui.bookmakerRating.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerItem
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerTableItemBase
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerTableItemType

class BookmakerItemAdapter(listener: BookmakerItemListener)
    : RecyclerViewAdapterBase<BookmakerItemListener, BookmakerTableItemBase, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: BookmakerItemListener) {
        when (holder) {
            is BookmakerItemViewHolder -> holder.setListener(listener)
        }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: BookmakerTableItemBase) {
        when (holder) {
            is BookmakerItemViewHolder -> holder.setBookmakerItem(model as BookmakerItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getItemType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (BookmakerTableItemType.values()[viewType]) {
            BookmakerTableItemType.BOOKMAKER -> return BookmakerItemViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_bookmaker_rating_table_line, parent, false))
            BookmakerTableItemType.FOOTER -> return BookmakerFooterViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_footer, parent, false))
            else -> return BookmakerTableHeaderViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_bookmaker_rating_table_header, parent, false))
        }
    }
}
