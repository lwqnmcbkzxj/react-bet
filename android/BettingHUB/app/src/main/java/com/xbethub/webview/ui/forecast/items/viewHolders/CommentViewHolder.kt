package com.xbethub.webview.ui.forecast.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.models.Comment
import com.xbethub.webview.ui.forecast.items.ItemListener

open class CommentViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    lateinit var comment: Comment


    fun setListener(listener: ItemListener) {

    }
}
