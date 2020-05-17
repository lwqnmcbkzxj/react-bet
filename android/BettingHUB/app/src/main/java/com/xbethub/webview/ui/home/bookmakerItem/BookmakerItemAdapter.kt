package com.xbethub.webview.ui.home.bookmakerItem

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.ui.RecyclerViewAdapterBase
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerItem
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerTableItemBase
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerTableItemType

class BookmakerItemAdapter(listener: BookmakerItemListener)
    : RecyclerViewAdapterBase<BookmakerItemListener, BookmakerTableItemBase, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: BookmakerItemListener) {
        if (holder is BookmakerItemViewHolder) holder.setListener(listener)
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

            else -> return BookmakerTableHeaderViewHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_bookmaker_rating_table_header, parent, false))
        }
    }
}
