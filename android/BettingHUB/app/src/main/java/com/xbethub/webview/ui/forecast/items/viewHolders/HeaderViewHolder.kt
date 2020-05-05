package com.xbethub.webview.ui.forecast.items.viewHolders

import android.content.Context
import android.view.View
import android.view.inputmethod.InputMethodManager
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemForecastHeaderBinding
import com.xbethub.webview.ui.forecast.ForecastViewModel
import com.xbethub.webview.ui.forecast.items.items.HeaderItem
import java.text.SimpleDateFormat

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val SERVER_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private val TIME_FORMAT = "yyyy.MM.dd в HH:mm"

    private val binding = ItemForecastHeaderBinding.bind(itemView)
    private val context = itemView.context

    private var searchActive = false

    init {
        updateSearchFieldVisibility()

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
    }

    fun setHeaderItem(headerItem: HeaderItem) {
        val forecast = headerItem.forecast

        // TODO: делать это в лейауте
        binding.eventName.text = forecast.tournament
        binding.teams.text = forecast.text
        binding.coefficient.text = forecast.coefficient
        binding.bet.text = forecast.betValue
        binding.forecasterName.text = forecast.userName
        binding.bookmarkCount.text = forecast.favAmmount.toString()
        binding.commentCount1.text = forecast.commentCount.toString()
        binding.commentCount2.text = forecast.commentCount.toString()
        binding.rating.text = forecast.rating.toString()
        Glide.with(binding.forecasterAvatar).load("http://xbethub.com" + forecast.userAvatar).into(binding.forecasterAvatar)

        // TODO: вынести константы
        try {
            val date = SimpleDateFormat(SERVER_TIME_PATTERN).parse(forecast.time)
            val time = SimpleDateFormat(TIME_FORMAT).format(date)

            binding.dateAndTime.text = time
            binding.eventTime.text = time
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun setViewModel(viewModel: ForecastViewModel, viewLifecycleOwner: LifecycleOwner) {
    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            Utils.showKeyboard(context)
        }
    }
    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }
}
