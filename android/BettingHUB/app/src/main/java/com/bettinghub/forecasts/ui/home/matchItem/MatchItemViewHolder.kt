package com.bettinghub.forecasts.ui.home.matchItem

import android.annotation.SuppressLint
import android.view.View
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.databinding.ItemMatchRatingTableLineBinding
import com.bettinghub.forecasts.models.Event
import com.bettinghub.forecasts.ui.home.matchItem.items.MatchItem
import java.text.SimpleDateFormat

class MatchItemViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    private val binding = ItemMatchRatingTableLineBinding.bind(itemView)
    private var match: Event? = null

    val serverDateFormat = SimpleDateFormat(App.appComponent.getConstants().serverTimePattern)
    val timeFormat = SimpleDateFormat("HH:mm")
    val dateFormat = SimpleDateFormat("dd.MM.yyyy")

    @SuppressLint("SetTextI18n")
    fun setMatchItem(matchItem: MatchItem) {
        match = matchItem.match

        if (matchItem.last) {
            binding.root.setBackgroundResource(R.drawable.bg_last_rating)
            binding.borders.visibility = View.GONE
        } else {
            binding.root.background = null
            binding.borders.visibility = View.VISIBLE
        }

        if (match != null) {
            serverDateFormat.parse(match!!.eventStart)!!.let {
                binding.date.text = dateFormat.format(it)
                binding.time.text = timeFormat.format(it)
            }

            binding.teams.text = match!!.event
            binding.tournamentName.text = match!!.championship.championship

            match!!.forecastCount.let {
                if (it > 0) {
                    binding.bets.setTextColor(ContextCompat.getColor(itemView.context, R.color.textColor2))
                    binding.bets.text = "+$it"
                } else {
                    binding.bets.setTextColor(ContextCompat.getColor(itemView.context, R.color.textColor3))
                    binding.bets.text = it.toString()
                }
            }

            Glide.with(binding.sportIcon).load("http://betting-hub.sixhands.co${match!!.championship.sportImage}").into(binding.sportIcon)

            binding.loading.root.visibility = View.GONE
            binding.main.visibility = View.VISIBLE
        } else {
            binding.main.visibility = View.GONE
            binding.loading.root.visibility = View.VISIBLE
        }
    }

    fun setListener(listener: MatchItemListener) {
        binding.root.setOnClickListener {
            match?.let {
                listener.onMatchClick(it, adapterPosition)
            }
        }
    }
}
