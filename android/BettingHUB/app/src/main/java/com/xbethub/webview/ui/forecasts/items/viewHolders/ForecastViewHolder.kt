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
    lateinit var forecast: Forecast

    fun setForecastItem(forecastItem: ForecastItem) {
        forecast = forecastItem.forecast

        // TODO: делать это в лейауте
        binding.userName.text = forecast.userName
        binding.categoryName.text = forecast.sportName
        binding.eventName.text = forecast.tournament
        binding.teams.text = forecast.text
        binding.betAmount.fieldValue = forecast.betValue
        binding.coefficient.fieldValue = forecast.coefficient
        binding.commentCount.text = forecast.commentCount.toString()
        binding.rating.text = forecast.rating.toString()
        binding.bookmarkCount.text = forecast.favAmmount.toString()
        binding.gameStart.fieldValue = "-"

        // TODO: вынести константы
        try {
            val date = SimpleDateFormat(SERVER_TIME_PATTERN).parse(forecast.time)
            val time = SimpleDateFormat(TIME_FORMAT).format(date)

            binding.gameStart.fieldValue = time
        } catch (e: Exception) {
            e.printStackTrace()
        }


        Glide.with(binding.avatar).load("http://xbethub.com" + forecast.userAvatar).into(binding.avatar)
    }

    fun setListener(listener: ForecastListener) {
        itemView.setOnClickListener { listener.onForecastClick(forecast, adapterPosition) }
    }
}
