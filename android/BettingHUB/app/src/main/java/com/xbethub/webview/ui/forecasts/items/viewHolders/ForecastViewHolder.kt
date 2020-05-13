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
            binding.gameStart.fieldValue = "-"

            try {
                val date = SimpleDateFormat(serverTimePattern).parse(f.event.eventStart)
                val time = SimpleDateFormat(appTimePattern).format(date)

                binding.gameStart.fieldValue = time
            } catch (e: Exception) {
                e.printStackTrace()
            }

            loadAvatar(f)

            binding.loading.root.visibility = View.GONE
        } ?: run {
            binding.loading.root.visibility = View.VISIBLE
        }


    }

    private fun loadAvatar(forecast: Forecast) {
        forecast.user.avatar?.let {
            Glide.with(binding.avatar).load("http://xbethub.com" + it).addListener(object :
                RequestListener<Drawable> {

                override fun onLoadFailed(e: GlideException?, model: Any?, target: Target<Drawable>?,
                                          isFirstResource: Boolean): Boolean {
                    binding.avatar.scaleType = ImageView.ScaleType.FIT_CENTER
                    binding.avatar.setImageResource(R.drawable.default_avatar)

                    return true
                }
                override fun onResourceReady(resource: Drawable?, model: Any?, target: Target<Drawable>?,
                                             dataSource: DataSource?, isFirstResource: Boolean): Boolean {
                    resource?.let {
                        val w = resource.intrinsicWidth.toFloat()
                        val h = resource.intrinsicHeight.toFloat()
                        val matrix = Matrix()

                        if (binding.avatar.width == 0) {
                            binding.avatar.addOnLayoutChangeListener { v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom ->
                                val scale =
                                    Math.max(binding.avatar.width / w, binding.avatar.height / h)

                                matrix.setScale(scale, scale)

                                binding.avatar.scaleType = ImageView.ScaleType.MATRIX
                                binding.avatar.imageMatrix = matrix
                            }
                        } else {
                            val scale =
                                Math.max(binding.avatar.width / w, binding.avatar.height / h)

                            matrix.setScale(scale, scale)

                            binding.avatar.scaleType = ImageView.ScaleType.MATRIX
                            binding.avatar.imageMatrix = matrix
                        }
                    }

                    return false
                }
            }).into(binding.avatar)
        } ?: run {
            binding.avatar.scaleType = ImageView.ScaleType.FIT_CENTER
            binding.avatar.setImageResource(R.drawable.default_avatar)
        }
    }

    fun setListener(listener: ForecastListener) {
//        itemView.setOnClickListener {
//            listener.onForecastClick(
//                Forecast(0, 0, 0, 0, ""
//                    , "", "", "", 0, 0, "", ""
//                    , 0, 0, 0, 0, "", User(0, "", ""))
//                , adapterPosition)

            // TODO: раскоментить
//            forecast?.let {
//                listener.onForecastClick(it, adapterPosition)
//            }
    }
}
