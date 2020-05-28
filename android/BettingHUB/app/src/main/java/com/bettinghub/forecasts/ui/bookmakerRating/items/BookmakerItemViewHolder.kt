package com.bettinghub.forecasts.ui.bookmakerRating.items

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.databinding.ItemBookmakerRatingTableLineBinding
import com.bettinghub.forecasts.models.Bookmaker
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerItem

class BookmakerItemViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    private val binding = ItemBookmakerRatingTableLineBinding.bind(itemView)
    private var bookmaker: Bookmaker? = null

    fun setBookmakerItem(bookmakerItem: BookmakerItem) {
        bookmaker = bookmakerItem.bookmaker
        if (bookmakerItem.last) {
            binding.root.setBackgroundResource(R.drawable.bg_last_rating)
            binding.borders.visibility = View.GONE
        } else {
            binding.root.background = null
            binding.borders.visibility = View.VISIBLE
        }
        bookmaker?.let {
            Glide.with(binding.bookmakerLogo).load("http://betting-hub.sixhands.co/" + it.image).into(binding.bookmakerLogo)
            binding.rating.text = it.rating.toString()
            binding.bonus.text = "${it.bonus} ₽"

            binding.loading.root.visibility = View.GONE
            binding.main.visibility = View.VISIBLE
        } ?: run {
            binding.main.visibility = View.GONE
            binding.loading.root.visibility = View.VISIBLE
        }
    }

    fun setListener(listener: BookmakerItemListener) {
        binding.root.setOnClickListener {
            bookmaker?.let {
                listener.onBookmakerClick(it)
            }
        }
    }
}
