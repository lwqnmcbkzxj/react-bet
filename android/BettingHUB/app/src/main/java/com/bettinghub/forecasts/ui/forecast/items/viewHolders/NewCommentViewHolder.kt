package com.bettinghub.forecasts.ui.forecast.items.viewHolders

import android.view.View
import androidx.navigation.NavController
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import com.bettinghub.forecasts.ui.forecast.items.ItemListener
import kotlinx.android.synthetic.main.item_comment_new.view.*

class NewCommentViewHolder(itemView: View, val navController: NavController): RecyclerView.ViewHolder(itemView) {

    val commentEditText = itemView.commentEditText
    val addCommentButton = itemView.addCommentBtn
    val newCommentButton = itemView.newCommentButton
    val commentLayout = itemView.commentLayout

    init {
        newCommentButton.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
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
