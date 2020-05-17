package com.xbethub.webview.ui.home.bookmakerItem

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemBookmakerRatingTableLineBinding
import com.xbethub.webview.models.Bookmaker
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerItem

class BookmakerItemViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    private val binding = ItemBookmakerRatingTableLineBinding.bind(itemView)
    private var bookmaker: Bookmaker? = null

    fun setBookmakerItem(bookmakerItem: BookmakerItem) {
        if (bookmakerItem.last) {
            binding.root.setBackgroundResource(R.drawable.bg_last_rating)
            binding.borders.visibility = View.GONE
        } else {
            binding.root.background = null
            binding.borders.visibility = View.VISIBLE
        }
        bookmaker = bookmakerItem.bookmaker
    }

    fun setListener(listener: BookmakerItemListener) {
        binding.root.setOnClickListener {
            bookmaker?.let {
                listener.onBookmakerClick(it, adapterPosition)
            }
        }
    }
}
