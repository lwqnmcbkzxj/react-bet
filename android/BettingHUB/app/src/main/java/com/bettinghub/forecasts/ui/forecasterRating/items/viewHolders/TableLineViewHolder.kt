package com.bettinghub.forecasts.ui.forecasterRating.items.viewHolders

import android.view.View
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.databinding.ItemForecasterRatingLineBinding
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.forecasterRating.items.ItemListener
import com.bettinghub.forecasts.ui.forecasterRating.items.items.Item
import com.bettinghub.forecasts.ui.forecasterRating.items.items.TableLineItem
import kotlinx.android.synthetic.main.item_forecaster_rating_line.view.*

class TableLineViewHolder(itemView: View): BaseViewHolder(itemView) {
    private var binding = ItemForecasterRatingLineBinding.bind(itemView)
    private val context = itemView.context
    private var user: User? = null

    override fun setItem(item: Item) {
        val tableLineItem = item as TableLineItem
        val rating = tableLineItem.forecasterRating
        user = rating.user

        if (rating.number == 1 || rating.number == 4 || rating.number == 3) {
            binding.changeIndicator.visibility = View.VISIBLE
        } else {
            binding.changeIndicator.visibility = View.INVISIBLE
        }
        user?.let {
            Utils.loadAvatar(binding.avatar, it.avatar)

            binding.userName.text = it.login
            binding.wld.text = Utils.getWLDString(context, it.stats.winCount, it.stats.lossCount, it.stats.returnCount)
            binding.profit.text = Utils.round(it.stats.netProfit.toDouble(), 2).toString()
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
        itemView.setOnClickListener {
            user?.let {
                listener.onForecasterClick(it)
            }
        }
    }
}
