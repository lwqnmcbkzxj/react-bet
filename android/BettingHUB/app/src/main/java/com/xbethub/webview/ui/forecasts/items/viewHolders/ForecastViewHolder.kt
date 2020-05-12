package com.xbethub.webview.ui.forecasts.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.xbethub.webview.App
import com.xbethub.webview.databinding.ItemForecastBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.User
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

        forecast?.let { f ->
            // TODO: делать это в лейауте
//            binding.userName.text = f.user.login
//            binding.categoryName.text = "?" // TODO: название спорта
//            binding.eventName.text = f.title
//            binding.teams.text = f.text
//            binding.betAmount.fieldValue = f.betValue
//            binding.coefficient.fieldValue = f.coefficient
//            binding.commentCount.text = f.commentCount.toString()
//            binding.rating.text = f.rating.toString()
//            binding.bookmarkCount.text = f.favAmmount.toString()
//            binding.gameStart.fieldValue = "-"
//
//            // TODO: вынести константы
//            try {
//                val date = SimpleDateFormat(SERVER_TIME_PATTERN).parse(f.time)
//                val time = SimpleDateFormat(TIME_FORMAT).format(date)
//
//                binding.gameStart.fieldValue = time
//            } catch (e: Exception) {
//                e.printStackTrace()
//            }

            f.user.avatar?.let {Glide.with(binding.avatar).load("http://xbethub.com" + it).into(binding.avatar)}


            binding.loading.root.visibility = View.GONE
        } ?: run {
            //binding.loading.root.visibility = View.VISIBLE
        }


    }

    fun setListener(listener: ForecastListener) {
        itemView.setOnClickListener {
            listener.onForecastClick(
                Forecast(0, 0, 0, 0, ""
                    , "", "", "", 0, 0, "", ""
                    , 0, 0, 0, 0, "", User(0, "", ""))
                , adapterPosition)

            // TODO: раскоментить
//            forecast?.let {
//                listener.onForecastClick(it, adapterPosition)
//            }
        }
    }
}
