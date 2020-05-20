package com.xbethub.webview.ui.bookmakerRating.items

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemBookmakerRatingTableLineBinding
import com.xbethub.webview.models.Bookmaker
import com.xbethub.webview.ui.bookmaker.items.ItemListener
import com.xbethub.webview.ui.bookmakerRating.items.items.BookmakerItem

class BookmakerItemViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    private val binding = ItemBookmakerRatingTableLineBinding.bind(itemView)

    fun setBookmakerItem(bookmakerItem: BookmakerItem) {
        if (bookmakerItem.last) {
            binding.root.setBackgroundResource(R.drawable.bg_last_rating)
            binding.borders.visibility = View.GONE
        } else {
            binding.root.background = null
            binding.borders.visibility = View.VISIBLE
        }
    }

    fun setListener(listener: BookmakerItemListener) {
        itemView.setOnClickListener {
            listener.onBookmakerClick(Bookmaker())
        }
    }
}
