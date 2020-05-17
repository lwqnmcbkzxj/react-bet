package com.xbethub.webview.ui.bookmaker.items.viewHolders

import android.view.View
import androidx.core.text.HtmlCompat
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemBookmakerHeaderBinding
import com.xbethub.webview.ui.bookmaker.BookmakerViewModel
import com.xbethub.webview.ui.bookmaker.items.items.HeaderItem

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val SERVER_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private val TIME_FORMAT = "yyyy.MM.dd в HH:mm"

    private val binding = ItemBookmakerHeaderBinding.bind(itemView)
    private val context = itemView.context

    fun setHeaderItem(headerItem: HeaderItem) {
        val bookmaker = headerItem.bookmaker

        binding.factor.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)
        binding.line.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)
        binding.reliability.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)
        binding.payMethods.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)

        // TODO: делать это в лейауте
//        binding.eventName.text = forecast.tournament
//        binding.teams.text = forecast.text
//        binding.coefficient.text = forecast.coefficient
//        binding.bet.text = forecast.betValue
//        binding.forecasterName.text = forecast.userName
//        binding.bookmarkCount.text = forecast.favAmmount.toString()
//        binding.commentCount1.text = forecast.commentCount.toString()
//        binding.commentCount2.text = forecast.commentCount.toString()
//        binding.rating.text = forecast.rating.toString()
//        Glide.with(binding.forecasterAvatar).load("http://xbethub.com" + forecast.userAvatar).into(binding.forecasterAvatar)

        // TODO: вынести константы
//        try {
//            val date = SimpleDateFormat(SERVER_TIME_PATTERN).parse(forecast.time)
//            val time = SimpleDateFormat(TIME_FORMAT).format(date)
//
//            binding.dateAndTime.text = time
//            binding.eventTime.text = time
//        } catch (e: Exception) {
//            e.printStackTrace()
//        }
    }

    fun setViewModel(viewModel: BookmakerViewModel, viewLifecycleOwner: LifecycleOwner) {
    }
}
