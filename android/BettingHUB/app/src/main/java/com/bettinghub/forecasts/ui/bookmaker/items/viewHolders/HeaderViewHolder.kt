package com.bettinghub.forecasts.ui.bookmaker.items.viewHolders

import android.view.View
import androidx.core.text.HtmlCompat
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bettinghub.forecasts.databinding.ItemBookmakerHeaderBinding
import com.bettinghub.forecasts.models.Bookmaker
import com.bettinghub.forecasts.ui.bookmaker.BookmakerViewModel
import com.bettinghub.forecasts.ui.bookmaker.items.ItemListener
import com.bettinghub.forecasts.ui.bookmaker.items.items.HeaderItem

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val SERVER_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private val TIME_FORMAT = "yyyy.MM.dd в HH:mm"

    private val binding = ItemBookmakerHeaderBinding.bind(itemView)
    private val context = itemView.context
    private var bookmaker: Bookmaker? = null

    fun setHeaderItem(headerItem: HeaderItem) {
        bookmaker = headerItem.bookmaker

        binding.factor.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)
        binding.line.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)
        binding.reliability.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)
        binding.payMethods.text = HtmlCompat.fromHtml("<font color=\"#0F971D\">8.35</font>/10", HtmlCompat.FROM_HTML_MODE_COMPACT)

        bookmaker?.let {
            binding.title.text = it.title
            Glide.with(binding.bookmakerLogo).load("http://betting-hub.sixhands.co/" + it.image).into(binding.bookmakerLogo)
            binding.description.text = it.content
            binding.bet.text = "${it.bonus} ₽"
        }

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

    fun setListener(listener: ItemListener) {
        binding.link.setOnClickListener {
            bookmaker?.let {
                listener.onLinkClick(it.link)
            }
        }
    }
}
