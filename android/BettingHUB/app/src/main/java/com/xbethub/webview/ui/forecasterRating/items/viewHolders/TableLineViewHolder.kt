package com.xbethub.webview.ui.forecasterRating.items.viewHolders

import android.os.Build
import android.text.Html
import android.view.View
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemForecasterRatingLineBinding
import com.xbethub.webview.ui.forecasterRating.items.ItemListener
import com.xbethub.webview.ui.forecasterRating.items.items.Item
import com.xbethub.webview.ui.forecasterRating.items.items.TableLineItem
import kotlinx.android.synthetic.main.item_forecaster_rating_line.view.*

class TableLineViewHolder(itemView: View): BaseViewHolder(itemView) {
    private var binding = ItemForecasterRatingLineBinding.bind(itemView)
    private val context = itemView.context

    override fun setItem(item: Item) {
        val tableLineItem = item as TableLineItem
        val rating = tableLineItem.forecasterRating

        binding.number.text = rating.number.toString()

        if (rating.number == rating.max) {
            itemView.setBackgroundResource(R.drawable.bg_last_rating)
            itemView.borders.visibility = View.GONE
        } else {
            itemView.background = null
            itemView.borders.visibility = View.VISIBLE
        }

        val wdlHtml = context.getString(R.string.wldTemplate)
            .replace("#W_VALUE", "10")
            .replace("#L_VALUE", "2")
            .replace("#D_VALUE", "0")

        binding.wld.text = Utils.fromHtml(wdlHtml)
    }

    override fun setListener(listener: ItemListener) {

    }
}
