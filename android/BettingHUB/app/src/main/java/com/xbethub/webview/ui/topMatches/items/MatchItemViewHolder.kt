package com.xbethub.webview.ui.topMatches.items

import android.view.View
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemMatchRatingTableLineBinding
import com.xbethub.webview.models.Event
import com.xbethub.webview.ui.topMatches.items.items.MatchItem
import java.text.SimpleDateFormat

class MatchItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    private val binding = ItemMatchRatingTableLineBinding.bind(itemView)
    private var match: Event? = null

    val serverDateFormat = SimpleDateFormat(App.appComponent.getConstants().serverTimePattern)
    val timeFormat = SimpleDateFormat("HH:mm")
    val dateFormat = SimpleDateFormat("dd.MM.yyyy")

    fun setBookmakerItem(bookmakerItem: MatchItem) {
        match = bookmakerItem.match
        if (bookmakerItem.last) {
            binding.root.setBackgroundResource(R.drawable.bg_last_rating)
            binding.borders.visibility = View.GONE
        } else {
            binding.root.background = null
            binding.borders.visibility = View.VISIBLE
        }
        match?.let {
            serverDateFormat.parse(match!!.eventStart)!!.let {
                binding.date.text = dateFormat.format(it)
                binding.time.text = timeFormat.format(it)
            }
            binding.teams.text = match!!.event
            binding.tournamentName.text = match!!.championship.championship
            match!!.forecastCount.let {
                if (it > 0) {
                    binding.bets.setTextColor(
                        ContextCompat.getColor(
                            itemView.context,
                            R.color.textColor2
                        )
                    )
                    binding.bets.text = "+$it"
                } else {
                    binding.bets.setTextColor(
                        ContextCompat.getColor(
                            itemView.context,
                            R.color.textColor3
                        )
                    )
                    binding.bets.text = it.toString()
                }
            }
            if (match!!.championship.sportId == 5) {
                binding.sportIcon.setImageResource(R.drawable.sport_other)
            } else {
                Glide.with(binding.sportIcon).load("http://betting-hub.sixhands.co${match!!.championship.sportImage}").into(binding.sportIcon)
            }
        }
    }

    fun setListener(listener: MatchItemListener) {
        binding.root.setOnClickListener {
            match?.let {
                listener.onMatchClick(it)
            }
        }
    }
}
