package com.xbethub.webview.ui.forecast.items.viewHolders

import android.annotation.SuppressLint
import android.view.View
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemForecastHeaderBinding
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecast.ForecastViewModel
import com.xbethub.webview.ui.forecast.items.ItemListener
import com.xbethub.webview.ui.forecast.items.items.HeaderItem
import java.text.SimpleDateFormat

class HeaderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    private val binding = ItemForecastHeaderBinding.bind(itemView)
    private var user: User? = null

    @SuppressLint("SimpleDateFormat", "SetTextI18n")
    fun setHeaderItem(headerItem: HeaderItem) {
        val forecast = headerItem.forecast

        user = headerItem.forecast.user
        binding.eventName.text = forecast.event.championship.championship.also {
            binding.tournament.text = it
        }
        binding.teams.text = forecast.event.event
        binding.team1.name.text = forecast.event.team1.name
        binding.team2.name.text = forecast.event.team2.name
        binding.coefficient.text = forecast.bet.coefficient
        binding.bet.text = forecast.bet.bet
        binding.forecasterName.text = forecast.user.login
        binding.forecast.text = forecast.bet.type

        val roi = forecast.user.stats.roi?.toFloat() ?: 0f
        binding.profit.text = "+${String.format("%.2f", roi)}%"
        val context = binding.profit.context
        when {
            roi > 0f -> {
                binding.profit.setTextColor(ContextCompat.getColor(context, R.color.color1))
            }
            roi < 0f -> {
                binding.profit.setTextColor(ContextCompat.getColor(context, R.color.color2))
            }
            else -> {
                binding.profit.setTextColor(ContextCompat.getColor(context, R.color.color5))
            }
        }

        binding.description.text = forecast.text

        forecast.stats.subscriberCount.let {
            if (it == 0) {
                binding.bookmarkCount.visibility = View.GONE
            } else {
                binding.bookmarkCount.text = it.toString()
            }
        }
        forecast.stats.commentCount.let {
            if (it == 0) {
                binding.commentCount1.visibility = View.GONE
                binding.commentCount2.visibility = View.GONE
            } else {
                binding.commentCount1.text = it.toString()
                binding.commentCount2.text = it.toString()
            }
        }
        binding.rating.text = forecast.stats.rating.toString()


        Glide.with(binding.forecasterAvatar).load("http://xbethub.com" + forecast.user.avatar)
            .into(binding.forecasterAvatar)

        val time = SimpleDateFormat("yyyy.MM.dd в HH:mm").format(
            SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(forecast.event.eventStart)!!
        )

        binding.dateAndTime.text = time
        binding.eventTime.text = time

    }

    fun setViewModel(viewModel: ForecastViewModel, viewLifecycleOwner: LifecycleOwner) {
    }

    fun setListener(itemListener: ItemListener) {
        binding.forecasterBlock.setOnClickListener {
            user?.let {
                itemListener.onForecasterClick(it)
            }
        }
    }
}
