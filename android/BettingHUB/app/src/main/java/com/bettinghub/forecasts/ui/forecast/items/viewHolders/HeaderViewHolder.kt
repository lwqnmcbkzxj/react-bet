package com.bettinghub.forecasts.ui.forecast.items.viewHolders

import android.annotation.SuppressLint
import android.view.View
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import androidx.navigation.NavController
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.App
import com.bumptech.glide.Glide
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.databinding.ItemForecastHeaderBinding
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import com.bettinghub.forecasts.ui.forecast.ForecastViewModel
import com.bettinghub.forecasts.ui.forecast.items.ItemListener
import com.bettinghub.forecasts.ui.forecast.items.items.HeaderItem
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import java.text.SimpleDateFormat

class HeaderViewHolder(itemView: View, val navController: NavController) : RecyclerView.ViewHolder(itemView) {

    private val binding = ItemForecastHeaderBinding.bind(itemView)
    private var user: User? = null

    @SuppressLint("SimpleDateFormat", "SetTextI18n")
    fun setHeaderItem(headerItem: HeaderItem) {
        val forecast = headerItem.forecast

        user = headerItem.forecast.user
        binding.eventName.text = forecast.event.championship.championship.also {
            binding.tournament.text = it
        }
        if (forecast.isMarked) {
            binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark)
        } else {
            binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark_outline)
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

        binding.bookmarkIcon.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            BettingHubBackend().api.addToFavorite(forecast.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (!forecast.isMarked) {
                            forecast.stats.subscriberCount++
                            binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark)
                        } else {
                            forecast.stats.subscriberCount--
                            binding.bookmarkIcon.setImageResource(R.drawable.ic_bookmark_outline)
                        }
                        forecast.stats.subscriberCount.let {
                            if (it == 0) {
                                binding.bookmarkCount.visibility = View.GONE
                            } else {
                                binding.bookmarkCount.text = it.toString()
                            }
                        }
                        forecast.isMarked = !forecast.isMarked
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
            BettingHubBackend().api.dislikeForecast(forecast.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (forecast.vote != "dislike") {
                            forecast.stats.rating--
                            if (forecast.vote == "like") {
                                forecast.stats.rating--
                            }
                        } else {
                            forecast.stats.rating++
                        }
                        binding.rating.text = forecast.stats.rating.toString()
                        forecast.vote = if (forecast.vote == "dislike") null else "dislike"
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
            BettingHubBackend().api.likeForecast(forecast.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (forecast.vote != "like") {
                            forecast.stats.rating++
                            if (forecast.vote == "dislike") {
                                forecast.stats.rating++
                            }
                        } else {
                            forecast.stats.rating--
                        }
                        binding.rating.text = forecast.stats.rating.toString()
                        forecast.vote = if (forecast.vote == "like") null else "like"
                    }
                }, {
                    it.printStackTrace()
                })
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
                binding.commentCount2.text = "$it комментария"
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
