package com.xbethub.webview.ui.match.items.viewHolders

import android.os.Build
import android.text.Html
import android.view.View
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemForecasterRatingLineBinding
import com.xbethub.webview.ui.match.items.ItemListener
import com.xbethub.webview.ui.match.items.items.ForecasterTableLineItem
import com.xbethub.webview.ui.match.items.items.Item
import kotlinx.android.synthetic.main.item_forecaster_rating_line.view.*

class ForecasterTableLineViewHolder(itemView: View): BaseViewHolder(itemView) {
    private var binding = ItemForecasterRatingLineBinding.bind(itemView)
    private val context = itemView.context

    override fun setItem(item: Item) {
        val tableLineItem = item as ForecasterTableLineItem
        val rating = tableLineItem.forecasterRating
        val user = rating.user

        user?.let {
            Utils.loadAvatar(binding.avatar, user.avatar)

            binding.userName.text = user.login
            binding.wld.text = Utils.getWLDString(context, user.stats.winCount, user.stats.lossCount, user.stats.returnCount)
            binding.profit.text = Utils.round(user.stats.netProfit.toDouble(), 2).toString()
            binding.number.text = (rating.number + 1).toString()
            binding.loading.root.visibility = View.GONE
        } ?: run {
            binding.loading.root.visibility = View.VISIBLE
        }

        if (rating.last) {
            itemView.setBackgroundResource(R.drawable.bg_last_rating)
            itemView.borders.visibility = View.GONE
        } else {
            itemView.background = null
            itemView.borders.visibility = View.VISIBLE
        }
    }

    override fun setListener(listener: ItemListener) {

    }
}
