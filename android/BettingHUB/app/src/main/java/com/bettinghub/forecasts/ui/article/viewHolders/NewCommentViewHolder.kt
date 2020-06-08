package com.bettinghub.forecasts.ui.article.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.ui.article.ItemListener
import kotlinx.android.synthetic.main.item_comment_new.view.*

class NewCommentViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    val commentEditText = itemView.commentEditText
    val addCommentButton = itemView.addCommentBtn
    val newCommentButton = itemView.newCommentButton
    val commentLayout = itemView.commentLayout

    init {
        newCommentButton.setOnClickListener {
            newCommentButton.visibility = View.GONE
            commentLayout.visibility = View.VISIBLE
        }
    }

    fun setListener(itemListener: ItemListener) {
        addCommentButton.setOnClickListener {
            itemListener.onAddComment(commentEditText.text.toString()) {
                itemView.commentLayout.visibility = View.GONE
                itemView.commentEditText.setText("")
            }
        }
    }
}
