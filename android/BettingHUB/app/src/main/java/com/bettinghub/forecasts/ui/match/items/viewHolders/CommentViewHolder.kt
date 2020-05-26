package com.bettinghub.forecasts.ui.match.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.ui.forecast.items.ItemListener

open class CommentViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    lateinit var comment: Comment


    fun setListener(listener: ItemListener) {

    }
}
