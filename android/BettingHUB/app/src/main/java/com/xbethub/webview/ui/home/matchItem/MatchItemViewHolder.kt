package com.xbethub.webview.ui.home.matchItem

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemMatchRatingTableLineBinding
import com.xbethub.webview.ui.home.matchItem.items.MatchItem

class MatchItemViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    private val binding = ItemMatchRatingTableLineBinding.bind(itemView)

    fun setMatchItem(matchItem: MatchItem) {
        if (matchItem.last) {
            binding.root.setBackgroundResource(R.drawable.bg_last_rating)
            binding.borders.visibility = View.GONE
        } else {
            binding.root.background = null
            binding.borders.visibility = View.VISIBLE
        }
    }
}