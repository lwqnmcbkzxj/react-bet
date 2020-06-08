package com.bettinghub.forecasts.ui.forecasts.items.viewHolders

import android.view.View
import androidx.navigation.NavController
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.databinding.ItemForecastBinding
import com.bettinghub.forecasts.models.Forecast
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import com.bettinghub.forecasts.ui.forecasts.items.ForecastListener
import com.bettinghub.forecasts.ui.forecasts.items.items.ForecastItem
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import java.text.SimpleDateFormat

class ForecastViewHolder(itemView: View, val navController: NavController): RecyclerView.ViewHolder(itemView) {
    private val serverTimePattern = App.appComponent.getConstants().serverTimePattern
    private val appTimePattern = App.appComponent.getConstants().appTimePattern

    private var binding: ItemForecastBinding = ItemForecastBinding.bind(itemView)
    var forecast: Forecast? = null

    fun setForecastItem(forecastItem: ForecastItem) {
        forecast = forecastItem.forecast

        forecast?.let { f ->
            Glide.with(binding.categoryIcon).load("http://app.betthub.org${f.event.championship.sportImage}").into(binding.categoryIcon)
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
            if (f.user.lastFive.size > 0) {
                binding.win1.setImageResource(if (f.user.lastFive[0]) R.drawable.ic_check else R.drawable.ic_close)
            } else {
                binding.win1.visibility = View.INVISIBLE
            }
            if (f.user.lastFive.size > 1) {
                binding.win2.setImageResource(if (f.user.lastFive[1]) R.drawable.ic_check else R.drawable.ic_close)
            } else {
                binding.win2.visibility = View.INVISIBLE
            }
            if (f.user.lastFive.size > 2) {
                binding.win3.setImageResource(if (f.user.lastFive[2]) R.drawable.ic_check else R.drawable.ic_close)
            } else {
                binding.win3.visibility = View.INVISIBLE
            }
            if (f.user.lastFive.size > 3) {
                binding.win4.setImageResource(if (f.user.lastFive[3]) R.drawable.ic_check else R.drawable.ic_close)
            } else {
                binding.win4.visibility = View.INVISIBLE
            }
            if (f.user.lastFive.size > 4) {
                binding.win5.setImageResource(if (f.user.lastFive[4]) R.drawable.ic_check else R.drawable.ic_close)
            } else {
                binding.win5.visibility = View.INVISIBLE
            }
            binding.profit.text = "+${String.format("%.2f", f.user.stats.roi?.toFloat() ?: 0f * 100)}%"
            if (f.isMarked) {
                binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark)
            } else {
                binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark_outline)
            }
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
            binding.main.visibility = View.VISIBLE

            binding.bookmarkIcon.setOnClickListener {
                BettingHubBackend().api.addToFavorite(f.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        if (it.isSuccessful) {
                            if (!f.isMarked) {
                                f.stats.subscriberCount++
                                binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark)
                            } else {
                                f.stats.subscriberCount--
                                binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark_outline)
                            }
                            f.stats.subscriberCount.let {
                                if (it == 0) {
                                    binding.bookmarkCount.visibility = View.GONE
                                } else {
                                    binding.bookmarkCount.text = it.toString()
                                }
                            }
                            f.isMarked = !f.isMarked
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
            binding.downVoteBtn.setOnClickListener {
                if (App.appComponent.getAppData().activeUser == null) {
                    navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                    return@setOnClickListener
                }
                BettingHubBackend().api.dislikeForecast(f.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        if (it.isSuccessful) {
                            if (f.vote != "dislike") {
                                f.stats.rating--
                                if (f.vote == "like") {
                                    f.stats.rating--
                                }
                            } else {
                                f.stats.rating++
                            }
                            binding.rating.text = f.stats.rating.toString()
                            f.vote = if (f.vote == "dislike") null else "dislike"
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
            binding.upVoteBtn.setOnClickListener {
                if (App.appComponent.getAppData().activeUser == null) {
                    navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                    return@setOnClickListener
                }
                BettingHubBackend().api.likeForecast(f.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        if (it.isSuccessful) {
                            if (f.vote != "like") {
                                f.stats.rating++
                                if (f.vote == "dislike") {
                                    f.stats.rating++
                                }
                            } else {
                                f.stats.rating--
                            }
                            binding.rating.text = f.stats.rating.toString()
                            f.vote = if (f.vote == "like") null else "like"
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
        } ?: run {
            binding.main.visibility = View.GONE
            binding.loading.root.visibility = View.VISIBLE
        }
    }

    fun setListener(listener: ForecastListener) {
        binding.main.setOnClickListener {
            forecast?.let {
                listener.onForecastClick(it, adapterPosition)
            }
        }

    }
}
