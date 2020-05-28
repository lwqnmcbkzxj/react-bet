package com.bettinghub.forecasts.ui.topMatches.items

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.databinding.ItemMatchRatingTableHeaderBinding

class MatchTableHeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemMatchRatingTableHeaderBinding.bind(itemView)

    init {
        binding.root.setBackgroundResource(R.drawable.bg_rating_header)
        binding.borders.visibility = View.GONE
    }
}
