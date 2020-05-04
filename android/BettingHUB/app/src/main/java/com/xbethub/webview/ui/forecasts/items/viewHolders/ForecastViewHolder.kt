package com.xbethub.webview.ui.forecasts.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.xbethub.webview.databinding.ItemForecastBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import java.text.SimpleDateFormat

class ForecastViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val SERVER_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private val TIME_FORMAT = "yyyy.MM.dd в HH:mm"

    private var binding: ItemForecastBinding = ItemForecastBinding.bind(itemView)
    var forecast: Forecast? = null

    fun setForecastItem(forecastItem: ForecastItem) {
        forecast = forecastItem.forecast

        forecast?.let {
            // TODO: делать это в лейауте
            binding.userName.text = it.userName
            binding.categoryName.text = it.sportName
            binding.eventName.text = it.tournament
            binding.teams.text = it.text
            binding.betAmount.fieldValue = it.betValue
            binding.coefficient.fieldValue = it.coefficient
            binding.commentCount.text = it.commentCount.toString()
            binding.rating.text = it.rating.toString()
            binding.bookmarkCount.text = it.favAmmount.toString()
            binding.gameStart.fieldValue = "-"

            // TODO: вынести константы
            try {
                val date = SimpleDateFormat(SERVER_TIME_PATTERN).parse(it.time)
                val time = SimpleDateFormat(TIME_FORMAT).format(date)

                binding.gameStart.fieldValue = time
            } catch (e: Exception) {
                e.printStackTrace()
            }


            Glide.with(binding.avatar).load("http://xbethub.com" + it.userAvatar).into(binding.avatar)

            binding.loading.root.visibility = View.GONE
        } ?: run {
            binding.loading.root.visibility = View.VISIBLE
        }


    }

    fun setListener(listener: ForecastListener) {
        itemView.setOnClickListener {
            forecast?.let {
                listener.onForecastClick(it, adapterPosition)
            }
        }
    }
}
