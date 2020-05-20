package com.xbethub.webview.ui.forecasts.items.viewHolders

import android.graphics.Matrix
import android.graphics.drawable.Drawable
import android.view.View
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemForecastBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import java.text.SimpleDateFormat

class ForecastViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val serverTimePattern = App.appComponent.getConstants().serverTimePattern
    private val appTimePattern = App.appComponent.getConstants().appTimePattern

    private var binding: ItemForecastBinding = ItemForecastBinding.bind(itemView)
    var forecast: Forecast? = null

    fun setForecastItem(forecastItem: ForecastItem) {
        forecast = forecastItem.forecast

        forecast?.let { f ->
            binding.userName.text = f.user.login
            binding.categoryName.text = f.event.championship.sportName + "."
            binding.eventName.text = f.event.championship.championship.replace(f.event.championship.sportName + ". ", "")
            binding.teams.text = f.event.event
            binding.description.text = f.text
            binding.forecast.fieldValue = f.bet.type
            binding.betAmount.fieldValue = f.bet.bet
            binding.coefficient.fieldValue = f.bet.coefficient
            binding.commentCount.text = f.stats.commentCount.toString()
            binding.rating.text = f.stats.rating.toString()
            binding.bookmarkCount.text = f.stats.subscriberCount.toString()
            binding.win1.setImageResource(if (f.user.lastFive[0]) R.drawable.ic_check else R.drawable.ic_close)
            binding.win2.setImageResource(if (f.user.lastFive[1]) R.drawable.ic_check else R.drawable.ic_close)
            binding.win3.setImageResource(if (f.user.lastFive[2]) R.drawable.ic_check else R.drawable.ic_close)
            binding.win4.setImageResource(if (f.user.lastFive[3]) R.drawable.ic_check else R.drawable.ic_close)
            binding.win5.setImageResource(if (f.user.lastFive[4]) R.drawable.ic_check else R.drawable.ic_close)
            binding.profit.text = "+${String.format("%.2f", f.user.stats.roi?.toFloat() ?: 0f * 100)}%"

            f.stats.subscriberCount.let {
                if (it == 0) {
                    binding.bookmarkCount.visibility = View.GONE
                } else {
                    binding.bookmarkCount.text = it.toString()
                }
            }
            f.stats.commentCount.let {
                if (it == 0) {
                    binding.commentCount.visibility = View.GONE
                } else {
                    binding.commentCount.text = it.toString()
                }
            }

            try {
                val date = SimpleDateFormat(serverTimePattern).parse(f.event.eventStart)
                val time = SimpleDateFormat(appTimePattern).format(date)

                binding.gameStart.fieldValue = time
            } catch (e: Exception) {
                e.printStackTrace()
            }

            Utils.loadAvatar(binding.avatar, f.user.avatar)

            binding.loading.root.visibility = View.GONE
        } ?: run {
            binding.loading.root.visibility = View.VISIBLE
        }


    }

    fun setListener(listener: ForecastListener) {
        binding.root.setOnClickListener {
            forecast?.let {
                listener.onForecastClick(it, adapterPosition)
            }
        }

    }
}
